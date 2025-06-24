import os
import dramatiq
from dramatiq.brokers.rabbitmq import RabbitmqBroker
from dramatiq.middleware import TimeLimit, Retries

# Initialize Dramatiq broker
rabbitmq_url = os.getenv('RABBITMQ_URL')

middleware = [
    dramatiq.middleware.AsyncIO(),
    Retries(max_retries=3),
    TimeLimit(time_limit=600000),  # 10 minutes
]

if rabbitmq_url:
    rabbitmq_broker = RabbitmqBroker(url=rabbitmq_url, middleware=middleware)
else:
    rabbitmq_host = os.getenv('RABBITMQ_HOST', 'localhost') 
    rabbitmq_port = int(os.getenv('RABBITMQ_PORT', 5672))
    rabbitmq_broker = RabbitmqBroker(host=rabbitmq_host, port=rabbitmq_port, middleware=middleware)

dramatiq.set_broker(rabbitmq_broker)