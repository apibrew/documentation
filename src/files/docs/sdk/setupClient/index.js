import {Client} from '@apibrew/client';

// Use one of following methods to create client

// Option 1. Create client from default config (from apbr config file)
const client = Client.newClient();

// Option 2. By Apbr URL (you need to authenticate separately)
const client = Client.newClient("https://apbr.io");

// Option 3. By separate profile
const client = Client.newClientByServerName("my-profile");

// Option 4. Inline config
const client = Client.newClientByServerConfig({
  host: 'localhost',
  port: 9009,
  httpPort: 9009,
  insecure: true,
  authentication: { // either username/password or token can be used for authentication.
    username: 'admin',
    password: 'admin',
    token: 'token123'
  }
});
