# syntax=docker/dockerfile:1
#
# Production image for Dokploy. Ships full production node_modules (not the
# Next.js "standalone" trace) so that `payload migrate` can run at container
# startup alongside `next start` — Payload's CLI needs the full dependency
# tree and the `src/` sources, which a pruned standalone build would not
# reliably include.
#
# The pnpm version is pinned via the `packageManager` field in package.json
# (read automatically by `corepack enable`), so this build always uses the
# exact same pnpm version the lockfile was generated with.

FROM node:22.17.0-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# ---- Install dependencies ----
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

# ---- Build ----
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1

# Build-time-only placeholders. Some server code (e.g. the Account section's
# layout, which calls getPayload() to check the session before rendering)
# runs during `next build`'s page-data collection, even for routes that end
# up server-rendered on demand — so Payload's init needs SOME secret/DB URL
# to not throw, even though no real request or session exists at build
# time. These values are never used to sign or verify anything real.
#
# The ACTUAL secret is supplied only at container runtime via Dokploy's
# Environment tab and is never baked into this image: ENV values set in
# this stage do not carry over to the `runner` stage below, since it starts
# fresh `FROM base`, not `FROM builder`.
ENV PAYLOAD_SECRET=build-time-placeholder-overridden-at-runtime
ENV DATABASE_URL=file:./build-placeholder.db

# Some routes call getPayload() during next build's page-data collection
# even though they end up server-rendered on demand (e.g. the Account
# section checks the session via headers(), which only bails out of static
# generation *after* getPayload() has already connected) — so the DB needs
# a real schema at build time, even with no real content in it. This
# placeholder file/schema never leaves the builder stage.
RUN corepack enable \
  && ./node_modules/.bin/payload migrate \
  && pnpm run build \
  && rm -f build-placeholder.db*

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
