#!/usr/bin/env bash
# KVI website go-live. Safe to re-run. Stops before touching production if any
# check fails. Output is also saved to deploy.log.
cd "$(dirname "$0")" || exit 1
exec > >(tee deploy.log) 2>&1

stop() {
  echo
  echo "STOPPED: $1"
  echo "Production was not changed by this step. Details are in deploy.log."
  docker rm -f kvi-website-candidate >/dev/null 2>&1
  exit 1
}

echo "== Pre-checks"
date
git log --oneline -1
docker ps >/dev/null || stop "Docker is not reachable by this user."
docker ps --filter name=kvi-website --format '{{.Names}} {{.Image}} {{.Status}}'
docker rm -f kvi-website-candidate >/dev/null 2>&1

# The contact form endpoint is baked in at build time. Do not silently lose it.
LIVE_FORM=$(docker exec kvi-website sh -c 'grep -l formspree.io /usr/share/nginx/html/assets/*.js' 2>/dev/null)
ENDPOINT="${VITE_CONTACT_ENDPOINT:-$(grep -s '^VITE_CONTACT_ENDPOINT=' .env | cut -d= -f2-)}"
echo "Live site uses Formspree: $([ -n "$LIVE_FORM" ] && echo yes || echo no)"
echo "Endpoint set for this build: $([ -n "$ENDPOINT" ] && echo yes || echo no)"
if [ -n "$LIVE_FORM" ] && [ -z "$ENDPOINT" ]; then
  stop "The live contact form posts to Formspree, but no VITE_CONTACT_ENDPOINT is set here. Add it to .env first."
fi

echo "== 1. Build the candidate"
docker build --build-arg VITE_CONTACT_ENDPOINT="$ENDPOINT" -t kvi-website:candidate . || stop "docker build failed."

echo "== 2. Test the candidate"
docker run -d --rm --name kvi-website-candidate -p 127.0.0.1:18080:80 kvi-website:candidate || stop "candidate would not start."
sleep 2
# This host has no Node, so the tests run in Playwright's official image.
docker run --rm --network container:kvi-website-candidate -v "$PWD":/app:ro -w /app -e BASE_URL=http://127.0.0.1 \
  mcr.microsoft.com/playwright:v1.63.0-noble node tests/e2e/site.mjs || stop "acceptance tests failed."
curl -sI http://127.0.0.1:18080/businesses | grep -i '^location' || stop "/businesses redirect is missing."
curl -s http://127.0.0.1:18080/greens | grep -q '<title>KVI Greens' || stop "/greens static title is missing."
docker rm -f kvi-website-candidate >/dev/null 2>&1

echo "== 3. Go live"
TAG="rollback-$(date +%Y%m%d-%H%M)"
docker tag kvi-kvi:latest "kvi-kvi:$TAG" || stop "could not tag the current image for rollback."
echo "Rollback tag: kvi-kvi:$TAG"
docker compose up -d --build || { echo "DEPLOY FAILED. Roll back with:"; echo "docker tag kvi-kvi:$TAG kvi-kvi:latest && docker compose up -d --no-build --force-recreate kvi"; exit 1; }
sleep 3

echo "== 4. Verify the live site"
for p in / /greens /tech /infra /projects /contact /products/farmgrid; do
  curl -s -o /dev/null -w "%{http_code} $p\n" "https://kvinnovations.in$p"
done
curl -sI https://kvinnovations.in/businesses | grep -i '^location'
curl -s https://kvinnovations.in/greens | grep -o '<title>[^<]*'

echo "== 5. Update GitHub"
git push origin main || echo "Push failed. The site is live; run git push origin main later."

echo
echo "DONE."
