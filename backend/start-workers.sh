#!/bin/bash
cd /home/agentaz/suna/backend
source /home/agentaz/.cache/pypoetry/virtualenvs/suna-mbO5ACM1-py3.13/bin/activate

exec python start_workers.py