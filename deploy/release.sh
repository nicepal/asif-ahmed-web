#!/usr/bin/env bash
# Install, build, and (re)start the site with PM2. Run from the app dir or anywhere.
set -euo pipefail

APP_DIR="/srv/work/plain/asifahmed.tech"
APP_NAME="asifahmed"

cd "${APP_DIR}"

if ! command -v node >/dev/null 2>&1; then
  echo "Node is not installed. Run: sudo bash deploy/bootstrap-ubuntu.sh" >&2
  exit 1
fi

node -e 'const [maj, min] = process.versions.node.split(".").map(Number); if (maj < 22 || (maj === 22 && min < 13)) { console.error("Need Node >= 22.13.0, found " + process.version); process.exit(1); }'

if ! command -v pm2 >/dev/null 2>&1; then
  echo "PM2 is not installed. Run: sudo bash deploy/bootstrap-ubuntu.sh" >&2
  exit 1
fi

export NEXT_PUBLIC_SITE_URL="${NEXT_PUBLIC_SITE_URL:-https://asifahmed.tech}"

mkdir -p logs .wrangler

# vinext/wrangler live in dest. npm omits them when NODE_ENV=production.
echo "==> npm ci --include=dev"
NPM_CONFIG_PRODUCTION=false npm ci --include=dev

if [[ ! -x node_modules/.bin/vinext ]]; then
  echo "vinext is missing after install. Aborting." >&2
  exit 1
fi

echo "==> npm run build"
export NODE_ENV=production
npm run build

if [[ ! -f dist/server/index.js && ! -d dist ]]; then
  echo "Build did not produce dist/. Aborting restart." >&2
  exit 1
fi

echo "==> PM2 startOrReload ${APP_NAME}"
pm2 startOrReload ecosystem.config.cjs --update-env
pm2 save

echo
pm2 status "${APP_NAME}"
echo
echo "Listening:"
echo "  public  http://$(hostname -I 2>/dev/null | awk '{print $1}'):8500"
echo "  node    127.0.0.1:8520"
echo
echo "Check: curl -sI -H 'Host: asifahmed.tech' http://127.0.0.1:8500/"
