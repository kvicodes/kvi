# Stage 1: Build React/Vite application
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Baked in at build time (Vite env vars are compiled into the bundle, not read
# at runtime). Set via `docker compose build --build-arg` or the `args:` block
# in docker-compose.yml. Leave unset to keep the mailto: fallback — see
# src/lib/submitContact.js and DEPLOYMENT.md.
ARG VITE_CONTACT_ENDPOINT
ENV VITE_CONTACT_ENDPOINT=${VITE_CONTACT_ENDPOINT}

RUN npm run build


# Stage 2: Serve with Nginx
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]