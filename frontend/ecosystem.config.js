module.exports = {
  apps: [
    {
      name: 'krs-pupr-frontend',
      script: 'npm',
      args: 'start',
      instances: 1,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
      },
      env_staging: {
        NODE_ENV: 'staging',
        PORT: 5001,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5051,
      },
    },
  ],
}
