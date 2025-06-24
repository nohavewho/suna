#!/bin/bash
cd /home/agentaz/suna/backend
export $(cat .env | grep -v '^#' | xargs)
export MCP_CREDENTIAL_ENCRYPTION_KEY=foYE5InrROnCMDiSSP8qPnSNQXKYJp2gl6x49H7glUY=
/home/agentaz/.cache/pypoetry/virtualenvs/suna-mbO5ACM1-py3.13/bin/python -m dramatiq run_agent_background --processes 2 --threads 2