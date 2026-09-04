#!/usr/bin/env bash
# Quick health check for asifahmed.tech on Ubuntu VPS.
set -euo pipefail

APP_DIR="/srv/work/plain/asifahmed.tech"
APP_PORT="8520"
NGINX_PORT="8500"

cd "${APP_DIR}"

echo "==> PM2"
pm2 status asifahmed 2>/dev/null || pm2 status | grep -E 'asifahmed|name' || true

echo
echo "==> Listeners"
ss -ltn | grep -E ":${NGINX_PORT}|:${APP_PORT}" || true

echo
echo "==> Build output"
if [[ -f dist/server/index.js ]]; then
  echo "OK  dist/server/index.js exists"
else
  echo "MISSING  dist/server/index.js — run: npm run build"
fi

if [[ -x node_modules/.bin/vinext ]]; then
  echo "OK  node_modules/.bin/vinext"
else
  echo "MISSING  vinext — run: NPM_CONFIG_PRODUCTION=false npm ci --include=dev"
fi

echo
echo "==> Direct app (127.0.0.1:${APP_PORT})"
curl -sS -m 5 -D - -o /tmp/diag-app.body "http://127.0.0.1:${APP_PORT}/" 2>&1 | head -15 || echo "FAILED to reach :${APP_PORT}"
head -c 120 /tmp/diag-app.body 2>/dev/null; echo

echo
echo "==> Through nginx (:${NGINX_PORT}, Host: asifahmed.tech)"
curl -sS -m 5 -D - -o /tmp/diag-nginx.body \
  -H 'Host: asifahmed.tech' "http://127.0.0.1:${NGINX_PORT}/" 2>&1 | head -15 || echo "FAILED to reach :${NGINX_PORT}"
head -c 120 /tmp/diag-nginx.body 2>/dev/null; echo

echo
echo "==> nginx site config (needs upstream 127.0.0.1:${APP_PORT})"
if [[ -f /etc/nginx/sites-available/asifahmed.tech ]]; then
  grep -nE 'listen|server_name|proxy_pass|upstream|8520|8500' /etc/nginx/sites-available/asifahmed.tech || true
else
  echo "MISSING  /etc/nginx/sites-available/asifahmed.tech"
fi

echo
echo "==> Other nginx configs on :${NGINX_PORT}"
grep -Rni "listen.*${NGINX_PORT}" /etc/nginx/ 2>/dev/null || true

echo
echo "==> Recent PM2 logs (asifahmed)"
pm2 logs asifahmed --lines 30 --nostream 2>/dev/null || true

echo
echo "Expected:"
echo "  :${APP_PORT}  -> HTTP 200, content-type text/html"
echo "  :${NGINX_PORT} -> same (via nginx proxy to :${APP_PORT})"
echo "If :${APP_PORT} is HTML but :${NGINX_PORT} is JSON, nginx points to the wrong backend."
