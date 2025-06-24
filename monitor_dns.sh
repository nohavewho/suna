#!/bin/bash
# Monitor DNS propagation for airesearchprojects.com

EXPECTED_IP="192.241.137.155"
DOMAIN="airesearchprojects.com"

echo "Monitoring DNS propagation for $DOMAIN..."
echo "Waiting for DNS to point to $EXPECTED_IP"
echo "Press Ctrl+C to stop"

while true; do
    CURRENT_IP=$(dig +short $DOMAIN A 2>/dev/null | head -1)
    
    if [ "$CURRENT_IP" = "$EXPECTED_IP" ]; then
        echo -e "\n✅ DNS has propagated! Domain now points to $EXPECTED_IP"
        echo "You can now run the deployment scripts:"
        echo "  ./deploy_backend.sh"
        echo "  ./deploy_frontend.sh"
        break
    else
        echo -ne "\r⏳ Current DNS: $CURRENT_IP (waiting for $EXPECTED_IP)... "
    fi
    
    sleep 10
done