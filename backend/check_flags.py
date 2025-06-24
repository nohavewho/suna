#!/usr/bin/env python
import asyncio
import sys
import os
from dotenv import load_dotenv

# Add backend to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Load environment variables
load_dotenv()

from services import redis

async def main():
    # Initialize Redis
    await redis.initialize_async()
    
    # Check custom_agents flag directly
    redis_client = await redis.get_client()
    
    # Check if flag exists
    flag_key = "feature_flag:custom_agents"
    flag_data = await redis_client.hgetall(flag_key)
    
    print(f"custom_agents flag data: {flag_data}")
    
    # Check flag list
    flag_list = await redis_client.smembers("feature_flags:list")
    print(f"\nAll flags in list: {flag_list}")
    
    # Check each flag status
    print("\nFlag statuses:")
    for flag in flag_list:
        key = f"feature_flag:{flag}"
        enabled = await redis_client.hget(key, 'enabled')
        print(f"  {flag}: {enabled}")
    
    # Close Redis connection
    await redis.close()

if __name__ == "__main__":
    asyncio.run(main())