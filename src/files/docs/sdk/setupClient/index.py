from apibrew import Client

// Use one of following methods to create client

// Option 1. Create client from default config (from apbr config file)
client = Client.new_client()

// Option 2. By Apbr URL (you need to authenticate separately)
client = Client.new_client("https://apbr.io")

// Option 3. By separate profile
client = Client.new_client_by_server_name("my-profile")

// Option 4. Inline config
client = Client.new_client_by_server_config({
  'host': 'localhost',
  'port': 9009,
  'http_port': 9009,
  'insecure': True,
  'authentication': { // either username/password or token can be used for authentication.
    'username': 'admin',
    'password': 'admin',
    'token': 'token123'
  }
})
