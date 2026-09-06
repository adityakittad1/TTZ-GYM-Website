from passlib.context import CryptContext
import os
from dotenv import load_dotenv
from pathlib import Path

load_dotenv(Path(__file__).parent / '.env')

ctx = CryptContext(schemes=['bcrypt'], deprecated='auto')
stored_hash = os.environ.get('ADMIN_PASSWORD_HASH', '')
username = os.environ.get('ADMIN_USERNAME', '')

print(f"Username: {username}")
print(f"Hash loaded: {'yes' if stored_hash else 'NO - EMPTY!'}")
print(f"Hash value: {stored_hash[:20]}...")

# Test the password from the .env comment
test_password = "rexora1054"
result = ctx.verify(test_password, stored_hash) if stored_hash else False
print(f"Password '{test_password}' matches hash: {result}")

# Also generate a fresh hash for the password in case it's needed
fresh_hash = ctx.hash(test_password)
print(f"\nFresh hash for '{test_password}':")
print(fresh_hash)
