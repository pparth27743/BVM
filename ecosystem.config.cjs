module.exports = {
  apps: [
    {
      name: "bvm-app",
      script: ".next/standalone/server.js",
      cwd: __dirname,
      instances: 1,
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3100,
        HOSTNAME: "0.0.0.0",
      },
      max_restarts: 10,
      min_uptime: "10s",
      restart_delay: 5000,
      max_memory_restart: "500M",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      error_file: "./logs/error.log",
      out_file: "./logs/output.log",
      merge_logs: true,
      watch: false,
    },
  ],
};
