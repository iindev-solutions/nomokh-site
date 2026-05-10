#!/bin/sh
set -e
if [ -n "$DATABASE_URL" ]; then
  pnpm prisma:deploy
fi
node .output/server/index.mjs
