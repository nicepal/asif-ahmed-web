#!/usr/bin/env bash
# First-time Ubuntu VPS setup: Node 22, nginx, PM2, firewall for port 8500.
set -euo pipefail

APP_DIR="/srv/work/plain/asifahmed.tech"
NGINX_SITE="asifahmed.tech"
PUBLIC_PORT="8500"

if [[ "$(id -u)" -ne 0 ]]; then
  echo "Run as root: sudo bash deploy/bootstrap-ubuntu.sh" >&2
  exit 1
fi

export DEBIAN_FRONTEND=noninteractive

apt-get update
apt-get install -y --no-install-recommends \
  ca-certificates \
  curl \
  gnupg \
  nginx

if ! command -v node >/dev/null 2>&1 || ! node -e 'process.exit(Number(process.versions.node.split(".")[0]) >= 22 ? 0 : 1)'; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y nodejs
fi

node -e 'const [maj, min] = process.versions.node.split(".").map(Number); if (maj < 22 || (maj === 22 && min < 13)) { console.error("Need Node >= 22.13.0, found " + process.version); process.exit(1); }'
echo "Node $(node -v) / npm $(npm -v)"

npm install -g pm2

if [[ ! -f "${APP_DIR}/deploy/nginx-asifahmed.tech.conf" ]]; then
  echo "Clone the site into ${APP_DIR} before bootstrapping." >&2
  exit 1
fi

mkdir -p "${APP_DIR}/logs" "${APP_DIR}/.wrangler"
chown -R --reference="${APP_DIR}" "${APP_DIR}/logs" "${APP_DIR}/.wrangler" 2>/dev/null || true

install -m 644 "${APP_DIR}/deploy/nginx-asifahmed.tech.conf" "/etc/nginx/sites-available/${NGINX_SITE}"
ln -sfn "/etc/nginx/sites-available/${NGINX_SITE}" "/etc/nginx/sites-enabled/${NGINX_SITE}"
nginx -t
systemctl enable --now nginx
systemctl reload nginx

if command -v ufw >/dev/null 2>&1 && ufw status | grep -q "Status: active"; then
  ufw allow "${PUBLIC_PORT}/tcp" comment "asifahmed.tech nginx"
fi

DEPLOY_USER="${SUDO_USER:-root}"
DEPLOY_HOME="$(getent passwd "${DEPLOY_USER}" | cut -d: -f6)"
if [[ "${DEPLOY_USER}" == "root" ]]; then
  pm2 startup systemd -u root --hp /root
else
  env PATH="/usr/bin:${PATH}" pm2 startup systemd -u "${DEPLOY_USER}" --hp "${DEPLOY_HOME}"
fi

echo
echo "Bootstrap done."
echo "  nginx  -> :${PUBLIC_PORT}"
echo "  app    -> 127.0.0.1:8520 (PM2, after release)"
echo "Point Caddy at 127.0.0.1:${PUBLIC_PORT} using deploy/Caddyfile.asifahmed.tech"
echo "Next: cd ${APP_DIR} && bash deploy/release.sh"
