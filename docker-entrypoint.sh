#!/bin/sh
set -e

echo "==> Ensuring persistent data directories exist..."
mkdir -p ./data ./media

# Whatever Dokploy mounts onto ./data and ./media (a bind mount to a host
# path, in particular) brings its own ownership, which can easily not be
# the `nextjs` user this app runs as — that shows up as "unable to open
# database file" at runtime. Since this script starts as root, fix it here
# on every boot before dropping privileges. Cheap for a small SQLite file
# and a handful of images; if the media library gets very large this could
# be skipped after the first successful boot.
echo "==> Fixing ownership of persistent data directories..."
chown -R nextjs:nodejs ./data ./media

PORT="${PORT:-3000}"

echo "==> Running Payload migrations..."
su-exec nextjs:nodejs ./node_modules/.bin/payload migrate

echo "==> Starting Next.js server on port ${PORT}..."
exec su-exec nextjs:nodejs ./node_modules/.bin/next start -H 0.0.0.0 -p "${PORT}"
