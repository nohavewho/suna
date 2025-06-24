#!/usr/bin/env python3
"""
Script to update default agent name from Suna to Agent AZ
"""

import asyncio
import sys
import os
sys.path.append('/home/agentaz/suna/backend')

from services.supabase import db_connection
from utils.logger import logger

async def update_agent_names():
    """Update agent names in the database"""
    try:
        # Initialize database connection
        await db_connection.initialize()
        
        # Get the Supabase client
        client = db_connection.get_client()
        
        # Update default agent name from Suna to Agent AZ
        logger.info("Updating default agent name from Suna to Agent AZ...")
        
        # First, find and update the default agent
        result = await client.table('agents').update({
            'name': 'Agent AZ',
            'description': 'Advanced autonomous AI Agent specialized in geopolitical media analysis',
            'updated_at': 'now()'
        }).eq('is_default', True).eq('name', 'Suna').execute()
        
        if result.data:
            logger.info(f"Updated {len(result.data)} default agent(s)")
        
        # Also update any non-default agents with Suna in the name
        all_agents = await client.table('agents').select('*').like('name', '%Suna%').execute()
        
        for agent in all_agents.data:
            if agent['name'] != 'Agent AZ':  # Skip if already updated
                new_name = agent['name'].replace('Suna', 'Agent AZ')
                await client.table('agents').update({
                    'name': new_name,
                    'updated_at': 'now()'
                }).eq('agent_id', agent['agent_id']).execute()
                logger.info(f"Updated agent {agent['agent_id']}: {agent['name']} -> {new_name}")
        
        logger.info("Agent name update completed successfully!")
        
    except Exception as e:
        logger.error(f"Error updating agent names: {e}")
        raise

if __name__ == "__main__":
    asyncio.run(update_agent_names())