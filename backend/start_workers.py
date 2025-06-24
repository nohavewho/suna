#!/usr/bin/env python
import os
import sys
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Verify RABBITMQ_URL is loaded
rabbitmq_url = os.getenv('RABBITMQ_URL')
print(f"Starting workers with RABBITMQ_URL: {rabbitmq_url}")

if not rabbitmq_url:
    print("ERROR: RABBITMQ_URL not found in environment!")
    sys.exit(1)

# Initialize Dramatiq broker before importing run_agent_background
import dramatiq
from dramatiq.brokers.rabbitmq import RabbitmqBroker
from dramatiq.middleware import TimeLimit, ShutdownNotifications, Callbacks, Retries

# Create broker with proper middleware
rabbitmq_broker = RabbitmqBroker(
    url=rabbitmq_url,
    middleware=[
        # AsyncIO support must be first
        dramatiq.middleware.AsyncIO(),
        # Retry support
        Retries(max_retries=3),
        # Limit execution time to 10 minutes per task
        TimeLimit(time_limit=600000),  # 10 minutes in milliseconds
        # Graceful shutdown
        ShutdownNotifications(),
        # Callbacks for monitoring
        Callbacks(),
    ]
)

# Configure connection pool for better concurrency
rabbitmq_broker.connection_options = {
    "connection_attempts": 5,
    "retry_delay": 1,
    "heartbeat": 600,  # 10 minutes
    "blocked_connection_timeout": 300,  # 5 minutes
}

dramatiq.set_broker(rabbitmq_broker)

# Now import and run the workers
from dramatiq.cli import main

# Run dramatiq with more processes and threads for better concurrency
# With 16GB RAM, we can afford more workers
sys.argv = ['dramatiq', 'run_agent_background', '--processes', '4', '--threads', '4']
print("Starting 4 worker processes with 4 threads each (16 concurrent tasks)")
main()