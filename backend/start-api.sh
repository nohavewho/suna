#!/bin/bash
cd /home/agentaz/suna/backend
source /home/agentaz/.cache/pypoetry/virtualenvs/suna-mbO5ACM1-py3.13/bin/activate

# Load environment variables
set -a
source .env
set +a

# Enable all feature flags on startup
echo "Enabling feature flags..."
python enable_all_flags.py

# Start the API
exec uvicorn api:app --host 0.0.0.0 --port 8000