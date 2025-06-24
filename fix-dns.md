# DNS Configuration Fix for airesearchprojects.com

## Problem
Domain airesearchprojects.com resolves to wrong IP: 192.168.2.12
Should resolve to server IP: 192.241.137.155

## Current DNS Status
- Domain uses Cloudflare nameservers: hayes.ns.cloudflare.com, shubhi.ns.cloudflare.com
- A record points to incorrect private IP

## Solution
1. Login to Cloudflare Dashboard: https://dash.cloudflare.com
2. Select domain: airesearchprojects.com
3. Go to DNS -> Records
4. Find A record for "@" (root domain)
5. Change IP from 192.168.2.12 to 192.241.137.155
6. Save changes

## Verification Commands
```bash
# Check DNS resolution
dig +short airesearchprojects.com

# Should return: 192.241.137.155
```

## Current Server Configuration
- Nginx listening on port 80
- Frontend on localhost:3000
- Backend on localhost:8000
- Ready for traffic once DNS is fixed