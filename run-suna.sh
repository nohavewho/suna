#!/bin/bash

echo "Starting Suna with Cloud Services..."
echo "===================================="

# Check if tunnel is running
if ! pgrep -f "cloudflared tunnel" > /dev/null; then
    echo "Starting Cloudflare tunnel..."
    nohup cloudflared tunnel --url http://localhost:3000 > tunnel.log 2>&1 &
    sleep 5
    TUNNEL_URL=$(cat tunnel.log | grep -oE "https://[a-z-]+\.trycloudflare\.com" | tail -1)
    echo "Tunnel URL: $TUNNEL_URL"
else
    echo "Tunnel already running"
    TUNNEL_URL=$(cat tunnel.log | grep -oE "https://[a-z-]+\.trycloudflare\.com" | tail -1)
    echo "Tunnel URL: $TUNNEL_URL"
fi

echo ""
echo "Starting frontend..."
cd frontend
npm run dev