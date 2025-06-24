#!/bin/bash
# Backend deployment script

echo "=== Suna Backend Deployment Script ==="

# 1. Create systemd service for backend API
sudo tee /etc/systemd/system/suna-backend.service << 'SERVICE'
[Unit]
Description=Suna Backend API
After=network.target

[Service]
Type=simple
User=agentaz
WorkingDirectory=/home/agentaz/suna/backend
ExecStart=/home/agentaz/.cache/pypoetry/virtualenvs/suna-mbO5ACM1-py3.13/bin/python api.py
Restart=on-failure
Environment=PYTHONUNBUFFERED=1
EnvironmentFile=/home/agentaz/suna/backend/.env

[Install]
WantedBy=multi-user.target
SERVICE

# 2. Create systemd service for backend worker
sudo tee /etc/systemd/system/suna-worker.service << 'SERVICE'
[Unit]
Description=Suna Backend Worker
After=network.target suna-backend.service

[Service]
Type=simple
User=agentaz
WorkingDirectory=/home/agentaz/suna/backend
ExecStart=/home/agentaz/.cache/pypoetry/virtualenvs/suna-mbO5ACM1-py3.13/bin/python -m dramatiq run_agent_background
Restart=on-failure
Environment=PYTHONUNBUFFERED=1
EnvironmentFile=/home/agentaz/suna/backend/.env

[Install]
WantedBy=multi-user.target
SERVICE

# 3. Stop current processes
echo "Stopping current processes..."
pkill -f "python.*api.py" || true
pkill -f "dramatiq run_agent_background" || true

# 4. Start services
sudo systemctl daemon-reload
sudo systemctl enable suna-backend suna-worker
sudo systemctl start suna-backend suna-worker

echo "=== Backend deployment complete! ==="
echo "To check status:"
echo "  sudo systemctl status suna-backend"
echo "  sudo systemctl status suna-worker"