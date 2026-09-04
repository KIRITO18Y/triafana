# syntax=docker/dockerfile:1
#
# Production image for Dokploy. Ships full production node_modules (not the
# Next.js "standalone" trace) so that `payload migrate` can run at container
# startup alongside `next start` — Payload's CLI needs the full dependency
# tree and the `src/` sources, which a pruned standalone build would not
# reliably include.

FROM node:22.17.0-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# ---- Install dependencies ----
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate \
  && pnpm install --frozen-lockfile

# ---- Build ----
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable && corepack prepare pnpm@latest --activate \
  && pnpm run build

# ---- Runtime ----
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs \
  # Persistent data lives here. Mount Dokploy volumes onto these two
  # directories so the SQLite database and uploaded media survive redeploys.
  && mkdir -p /app/data /app/media \
  && chown -R nextjs:nodejs /app/data /app/media

COPY --from=builder --chown=nextjs:nodejs /app ./
RUN chmod +x /app/docker-entrypoint.sh

USER nextjs
EXPOSE 3000

ENTRYPOINT ["/app/docker-entrypoint.sh"]
