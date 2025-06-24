#!/usr/bin/env python3
import asyncio
import os
from datetime import datetime
from services import db
from dotenv import load_dotenv

load_dotenv()

async def create_mcp_table():
    """Create the missing user_mcp_credential_profiles table"""
    try:
        client = await db.client
        
        # First check if table exists
        try:
            result = await client.table('user_mcp_credential_profiles').select('profile_id').limit(1).execute()
            print("Table user_mcp_credential_profiles already exists!")
            return
        except Exception as e:
            print(f"Table doesn't exist (expected): {e}")
            print("Creating table...")
        
        # Create table using raw SQL through Supabase
        # Note: Supabase doesn't have a direct SQL execution method via the client
        # So we'll need to create it through the Supabase dashboard or use migrations
        
        print("\nTable creation SQL has been generated in check_and_create_mcp_tables.sql")
        print("Please run this SQL in the Supabase SQL editor:")
        print("1. Go to https://app.supabase.com/project/peojtkesvynmmzftljxo/editor")
        print("2. Run the SQL from /home/agentaz/check_and_create_mcp_tables.sql")
        
        # For now, let's at least check if the workflows table needs the column
        try:
            result = await client.table('workflows').select('mcp_credential_mappings').limit(1).execute()
            print("\nColumn mcp_credential_mappings already exists in workflows table")
        except Exception as e:
            print(f"\nColumn mcp_credential_mappings might not exist in workflows: {e}")
            
    except Exception as e:
        print(f"Error: {e}")
    finally:
        await db.close()

if __name__ == "__main__":
    asyncio.run(create_mcp_table())