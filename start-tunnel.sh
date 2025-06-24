#!/bin/bash
echo "Starting Cloudflare tunnel for port 3000..."
echo "Your public URL will be displayed below:"
echo "========================================"
cloudflared tunnel --url http://localhost:3000