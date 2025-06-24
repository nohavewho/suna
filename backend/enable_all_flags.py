#!/usr/bin/env python
import asyncio
import sys
import os
from dotenv import load_dotenv

# Add backend to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Load environment variables
load_dotenv()

from flags.flags import enable_flag, list_flags
from services import redis

async def main():
    # Initialize Redis
    await redis.initialize_async()
    
    # Enable all necessary flags
    flags_to_enable = [
        ('custom_agents', 'Enable custom agents feature'),
        ('agent_builder', 'Enable agent builder feature'),
        ('marketplace', 'Enable marketplace feature'),
        ('workflow', 'Enable workflow feature'),
        ('custom_mcps', 'Enable custom MCPs feature'),
        ('agent_versions', 'Enable agent versions feature'),
        ('agent_sharing', 'Enable agent sharing feature'),
    ]
    
    print("Enabling feature flags...")
    
    for flag_name, description in flags_to_enable:
        success = await enable_flag(flag_name, description)
        if success:
            print(f"✅ Enabled: {flag_name}")
        else:
            print(f"❌ Failed to enable: {flag_name}")
    
    # List all flags to verify
    print("\nCurrent feature flags status:")
    all_flags = await list_flags()
    for flag, enabled in all_flags.items():
        status = "✅" if enabled else "❌"
        print(f"{status} {flag}: {enabled}")
    
    # Close Redis connection
    await redis.close()

if __name__ == "__main__":
    asyncio.run(main())