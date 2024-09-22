import secrets

# Generate a strong random secret key
secret_key = secrets.token_hex(32)
print(f"JWT_SECRET_KEY={secret_key}")