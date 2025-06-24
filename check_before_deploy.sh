#!/bin/bash
echo "=== Pre-deployment Check ==="

# Check DNS propagation
echo "1. Checking DNS propagation..."
EXPECTED_IP="192.241.137.155"
CURRENT_IP=$(dig +short airesearchprojects.com A)

if [ "$CURRENT_IP" = "$EXPECTED_IP" ]; then
    echo "✅ DNS is pointing to correct server: $EXPECTED_IP"
else
    echo "❌ DNS not updated yet. Current: $CURRENT_IP, Expected: $EXPECTED_IP"
    echo "   Please update DNS in Cloudflare first!"
    exit 1
fi

# Check if services are running
echo -e "\n2. Checking current services..."
if pgrep -f "python.*api.py" > /dev/null; then
    echo "✅ Backend API is running"
else
    echo "⚠️  Backend API is not running"
fi

if pgrep -f "dramatiq run_agent_background" > /dev/null; then
    echo "✅ Backend Worker is running"
else
    echo "⚠️  Backend Worker is not running"
fi

if pgrep -f "next-server" > /dev/null; then
    echo "✅ Frontend is running"
else
    echo "⚠️  Frontend is not running"
fi

# Check ports
echo -e "\n3. Checking ports..."
if ss -tlnp | grep -q ":8000"; then
    echo "✅ Backend API port 8000 is listening"
else
    echo "❌ Backend API port 8000 is not listening"
fi

if ss -tlnp | grep -q ":3000"; then
    echo "✅ Frontend port 3000 is listening"
else
    echo "❌ Frontend port 3000 is not listening"
fi

echo -e "\n=== Ready for deployment? ==="
echo "If all checks pass, run:"
echo "  1. ./deploy_backend.sh"
echo "  2. ./deploy_frontend.sh"