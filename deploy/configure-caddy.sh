#!/usr/bin/env bash
# Point Caddy (HTTPS) at the portfolio nginx listener on :8500.
set -euo pipefail

APP_DIR="/srv/work/plain/asifahmed.tech"
CADDYFILE="/etc/caddy/Caddyfile"
SNIPPET="${APP_DIR}/deploy/Caddyfile.asifahmed.tech"
IMPORT_PATH="/etc/caddy/asifahmed.tech.caddy"
PUBLIC_PORT="8500"

if [[ "$(id -u)" -ne 0 ]]; then
  echo "Run as root: sudo bash deploy/configure-caddy.sh" >&2
  exit 1
fi

if [[ ! -f "${SNIPPET}" ]]; then
  echo "Missing ${SNIPPET}. Pull the repo into ${APP_DIR} first." >&2
  exit 1
fi

if ! command -v caddy >/dev/null 2>&1; then
  echo "Caddy is not installed. Install it or update Caddy manually." >&2
  exit 1
fi

if ! ss -ltn | grep -q ":${PUBLIC_PORT} "; then
  echo "Nothing is listening on :${PUBLIC_PORT}."
  echo "Run: cd ${APP_DIR} && bash deploy/release.sh"
  exit 1
fi

echo "==> Current Caddy entries for asifahmed.tech (if any)"
grep -n 'asifahmed' "${CADDYFILE}" 2>/dev/null || true

install -m 644 "${SNIPPET}" "${IMPORT_PATH}"

if grep -q 'asifahmed\.tech' "${CADDYFILE}"; then
  echo
  echo "WARNING: ${CADDYFILE} already mentions asifahmed.tech."
  echo "Remove or comment out the old block that proxies to another app (often :3000 or :8080)."
  echo "Then add this line near the top of ${CADDYFILE}:"
  echo "  import asifahmed.tech.caddy"
  echo
else
  cp "${CADDYFILE}" "${CADDYFILE}.bak.$(date +%Y%m%d%H%M%S)"
  {
    echo "import asifahmed.tech.caddy"
    echo
    cat "${CADDYFILE}"
  } > "${CADDYFILE}.new"
  mv "${CADDYFILE}.new" "${CADDYFILE}"
  echo "==> Added import to ${CADDYFILE}"
fi

caddy validate --config "${CADDYFILE}"
systemctl reload caddy

echo
echo "Caddy reloaded. Test from the server:"
echo "  curl -sI -H 'Host: asifahmed.tech' http://127.0.0.1:${PUBLIC_PORT}/"
echo "  curl -sI https://asifahmed.tech/"
echo
echo "Expected: content-type text/html (not application/json)."
