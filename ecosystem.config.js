module.exports = {
  apps: [
    {
      name: 'backend-api',
      script: './backend/start-api.sh',
      cwd: '/home/agentaz/suna',
      interpreter: 'bash',
      env: {
        NODE_ENV: 'production'
      },
      error_file: './logs/api-error.log',
      out_file: './logs/api-out.log',
      log_file: './logs/api-combined.log',
      time: true,
      restart_delay: 5000,
      max_restarts: 10,
      // Memory monitoring
      max_memory_restart: '1G',
      // Auto restart on failure
      autorestart: true,
      watch: false,
      instances: 1,
      exec_mode: 'fork',
      // Error detection patterns
      error_detection_pattern: 'Too many connections|Connection refused|ECONNREFUSED|ETIMEDOUT',
      // Restart on specific exit codes
      stop_exit_codes: [0],
      // Exponential backoff for restarts
      exp_backoff_restart_delay: 100
    },
    {
      name: 'backend-workers',
      script: './backend/start-workers.sh',
      cwd: '/home/agentaz/suna',
      interpreter: 'bash',
      env: {
        NODE_ENV: 'production'
      },
      error_file: './logs/workers-error.log',
      out_file: './logs/workers-out.log', 
      log_file: './logs/workers-combined.log',
      time: true,
      restart_delay: 5000,
      max_restarts: 10,
      // Memory monitoring
      max_memory_restart: '2G',
      // Auto restart on failure
      autorestart: true,
      watch: false,
      instances: 1,
      exec_mode: 'fork',
      // Error detection patterns
      error_detection_pattern: 'Too many connections|Connection refused|ECONNREFUSED|ETIMEDOUT|AMQPConnectionError',
      // Exponential backoff for restarts
      exp_backoff_restart_delay: 100
    },
    {
      name: 'frontend',
      script: 'npm',
      args: 'start',
      cwd: '/home/agentaz/suna/frontend',
      env: {
        NODE_ENV: 'production'
      },
      error_file: '/home/agentaz/suna/logs/frontend-error.log',
      out_file: '/home/agentaz/suna/logs/frontend-out.log',
      log_file: '/home/agentaz/suna/logs/frontend-combined.log',
      time: true,
      restart_delay: 5000,
      max_restarts: 10
    }
  ]
};