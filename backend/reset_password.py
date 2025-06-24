#!/usr/bin/env python3
import os
import sys
from supabase import create_client, Client
from dotenv import load_dotenv
import bcrypt

# Load environment variables
load_dotenv()

# Initialize Supabase client with service role key for admin access
supabase: Client = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_SERVICE_ROLE_KEY")
)

def reset_user_password(user_id: str, new_password: str):
    """Reset password for a user by ID"""
    try:
        # Hash the new password
        password_hash = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        
        # Update user's password in auth.users table
        response = supabase.auth.admin.update_user_by_id(
            user_id,
            {"password": new_password}
        )
        
        print(f"✅ Password reset successful for user {user_id}")
        print(f"📧 Email: test@test.com")
        print(f"🔑 New password: {new_password}")
        
        return response
        
    except Exception as e:
        print(f"❌ Error resetting password: {str(e)}")
        return None

if __name__ == "__main__":
    user_id = "3c2e5b1c-659a-4b22-b6a2-d91315e12b32"
    new_password = "TestUser123!"  # Strong password with uppercase, lowercase, number and special char
    
    result = reset_user_password(user_id, new_password)
    
    if result:
        print("\n✨ Password has been reset successfully!")
        print("You can now login with:")
        print(f"  Email: test@test.com")
        print(f"  Password: {new_password}")