module.exports = {
  apps: [
    {
      name: "asifahmed",
      cwd: "/srv/work/plain/asifahmed.tech",
      script: "npm",
      args: "start",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_restarts: 10,
      min_uptime: "10s",
      env: {
        NODE_ENV: "production",
        PORT: "8510",
        NEXT_PUBLIC_SITE_URL: "https://asifahmed.tech",
        VINEXT_TRUST_PROXY: "1",
        VINEXT_TRUSTED_HOSTS: "asifahmed.tech,www.asifahmed.tech",
        WRANGLER_LOG_PATH: ".wrangler/wrangler.log",
      },
    },
  ],
};
