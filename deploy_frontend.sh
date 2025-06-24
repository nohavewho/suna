#!/bin/bash
# Frontend deployment script for airesearchprojects.com

echo "=== Suna Frontend Deployment Script ==="

# 1. Install nginx if not installed
if ! command -v nginx &> /dev/null; then
    echo "Installing nginx..."
    sudo apt update
    sudo apt install -y nginx certbot python3-certbot-nginx
fi

# 2. Build production frontend
echo "Building production frontend..."
cd /home/agentaz/suna/frontend

# Update .env.local for production
cat > .env.local << EOF
NEXT_PUBLIC_ENV_MODE=production
NEXT_PUBLIC_SUPABASE_URL=https://peojtkesvynmmzftljxo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlb2p0a2VzdnlubW16ZnRsanhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2MDE1NDUsImV4cCI6MjA2MzE3NzU0NX0.dJzh2xjMpG3AmeF6djOsLy69Cc6n2VF8IVKCbtBRPIY
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000/api
NEXT_PUBLIC_URL=https://airesearchprojects.com
OPENAI_API_KEY=YOUR_API_KEY_HERE
EOF

# Build
npm run build

# 3. Create nginx configuration
echo "Creating nginx configuration..."
sudo tee /etc/nginx/sites-available/suna << 'NGINX'
server {
    listen 80;
    server_name airesearchprojects.com www.airesearchprojects.com;

    # Redirect to HTTPS
    return 301 https://airesearchprojects.com$request_uri;
}

server {
    listen 443 ssl http2;
    server_name www.airesearchprojects.com;
    
    # SSL will be configured by certbot
    
    # Redirect www to non-www
    return 301 https://airesearchprojects.com$request_uri;
}

server {
    listen 443 ssl http2;
    server_name airesearchprojects.com;

    # SSL will be configured by certbot

    # Frontend proxy
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Backend API proxy
    location /api/ {
        proxy_pass http://localhost:8000/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
NGINX

# 4. Enable site
sudo ln -sf /etc/nginx/sites-available/suna /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx

# 5. Setup SSL with Let's Encrypt
echo "Setting up SSL certificate..."
sudo certbot --nginx -d airesearchprojects.com -d www.airesearchprojects.com --non-interactive --agree-tos --email admin@airesearchprojects.com

# 6. Create systemd service for Next.js
echo "Creating systemd service..."
sudo tee /etc/systemd/system/suna-frontend.service << 'SERVICE'
[Unit]
Description=Suna Frontend Next.js App
After=network.target

[Service]
Type=simple
User=agentaz
WorkingDirectory=/home/agentaz/suna/frontend
ExecStart=/usr/bin/npm start
Restart=on-failure
Environment=NODE_ENV=production
Environment=PORT=3000

[Install]
WantedBy=multi-user.target
SERVICE

# 7. Start services
sudo systemctl daemon-reload
sudo systemctl enable suna-frontend
sudo systemctl start suna-frontend

echo "=== Deployment complete! ==="
echo "Frontend should be available at https://airesearchprojects.com"
echo ""
echo "To check status: sudo systemctl status suna-frontend"
echo "To view logs: sudo journalctl -u suna-frontend -f"