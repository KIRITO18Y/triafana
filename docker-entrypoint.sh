#!/bin/sh
set -e

echo "==> Ensuring persistent data directories exist..."
mkdir -p ./data ./media

echo "==> Running Payload migrations..."
./node_modules/.bin/payload migrate

PORT="${PORT:-3000}"
echo "==> Starting Next.js server on port ${PORT}..."
exec ./node_modules/.bin/next start -H 0.0.0.0 -p "${PORT}"
