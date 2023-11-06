module.exports = {
    apps: [
      {
        name: 'my-app', 
        script: 'dist/server.js', 
        instances: 1, 
        exec_mode: 'cluster', 
        max_memory_restart: '200M', 
        env: {
          NODE_ENV: 'production', 
          PORT: 3002,
        },
        watch: false, 
        ignore_watch: ['node_modules', 'logs', 'public'],
      },
    ],
  };
  