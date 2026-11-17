# Deployment guide

The authoritative procedure is `DEPLOYMENT.md` (kvi-proxy architecture, candidate test, rollback, Formspree). This page is the short checklist for this release. **Nothing has been deployed.**

## Environment
| Variable | Needed | Notes |
| --- | --- | --- |
| `VITE_CONTACT_ENDPOINT` | yes, for a working form | Formspree URL, baked in at build time via `.env` or `--build-arg`. Unset means mailto fallback. |

No secrets are required.

## Steps
1. Review and commit the change (not yet committed).
2. `.go-live.sh` (untracked, not written by me) builds a candidate image, runs it on 127.0.0.1:18080, runs the acceptance suite in the Playwright image, and stops before production if anything fails. Read it first; it also replaces the running container.
3. Check after deploy: `curl -sI https://kvinnovations.in/innovation` returns 200; `curl -sI https://kvinnovations.in/businesses` returns 301 to `/about#verticals`; the contact form shows a real result.

## Health check
Static site: a 200 from `/` is the check. The container has no Docker healthcheck.

## Rollback
Before replacing, tag the running image: `docker tag kvi-kvi:latest kvi-kvi:rollback-$(date +%Y%m%d-%H%M)`. To roll back, retag that image as `kvi-kvi:latest` and recreate only `kvi-website` with `docker compose up -d`. DEPLOYMENT.md §1 has the exact commands.

## Not to change without approval
Caddyfile and `kvi-proxy`, DNS, TLS, other containers and volumes.
