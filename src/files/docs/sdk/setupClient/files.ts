
export const setupClientFiles = {
  "golang": "package main\n\nimport \"github.com/apibrew/apibrew/pkg/client\"\n\nfunc main() {\n    // Use one of following methods to create client\n\n    // Option 1. Create client from default config (from apbr config file)\n    client := client.NewClient()\n\n    // Option 2. By Apbr URL (you need to authenticate separately)\n    client := client.NewClient(\"https://apbr.io\")\n\n    // Option 3. By separate profile\n    client := client.NewClientByServerName(\"my-profile\")\n\n    // Option 4. Inline config\n    client := client.NewClientByServerConfig(&client.Server{\n        Host: \"localhost\",\n        Port: 9009,\n        HttpPort: 9009,\n        Insecure: true,\n        Authentication: &client.Authentication{ // either username/password or token can be used for authentication.\n            Username: \"admin\",\n            Password: \"admin\",\n            Token: \"token123\",\n        },\n    })\n}",
  "java": "import io.apibrew.client.Client;\n\npublic class Application {\n\n    public static void main(String[] args) {\n        // Use one of following methods to create client\n\n        // Option 1. Create client from default config (from apbr config file)\n        Client client = Client.newClient();\n\n        // Option 2. By Apbr URL (you need to authenticate separately)\n        Client client = Client.newClient(\"https://apbr.io\");\n\n        // Option 3. By separate profile\n        Client client = Client.newClientByServerName(\"my-profile\");\n\n        // Option 4. Inline config\n        Config.Server server = new Config.Server();\n        server.setHost(\"localhost\");\n        server.setPort(9009);\n        server.setHttpPort(9009);\n        server.setInsecure(true);\n        Config.Authentication authentication = new Config.Authentication();\n        // Either username/password or token can be used for authentication.\n        authentication.setUsername(\"admin\");\n        authentication.setPassword(\"admin\");\n        authentication.setToken(\"admin\");\n\n        server.setAuthentication(authentication);\n\n        Client client = Client.newClientByServerConfig(server);\n    }\n}",
  "javascript": "import {Client} from '@apibrew/client';\n\n// Use one of following methods to create client\n\n// Option 1. Create client from default config (from apbr config file)\nconst client = Client.newClient();\n\n// Option 2. By Apbr URL (you need to authenticate separately)\nconst client = Client.newClient(\"https://apbr.io\");\n\n// Option 3. By separate profile\nconst client = Client.newClientByServerName(\"my-profile\");\n\n// Option 4. Inline config\nconst client = Client.newClientByServerConfig({\n  host: 'localhost',\n  port: 9009,\n  httpPort: 9009,\n  insecure: true,\n  authentication: { // either username/password or token can be used for authentication.\n    username: 'admin',\n    password: 'admin',\n    token: 'token123'\n  }\n});",
  "python": "from apibrew import Client\n\n// Use one of following methods to create client\n\n// Option 1. Create client from default config (from apbr config file)\nclient = Client.new_client()\n\n// Option 2. By Apbr URL (you need to authenticate separately)\nclient = Client.new_client(\"https://apbr.io\")\n\n// Option 3. By separate profile\nclient = Client.new_client_by_server_name(\"my-profile\")\n\n// Option 4. Inline config\nclient = Client.new_client_by_server_config({\n  'host': 'localhost',\n  'port': 9009,\n  'http_port': 9009,\n  'insecure': True,\n  'authentication': { // either username/password or token can be used for authentication.\n    'username': 'admin',\n    'password': 'admin',\n    'token': 'token123'\n  }\n})",
  "react": "import {ClientImpl} from \"@apibrew/client/impl/client-impl\";\nimport {ClientProvider, LocalStorageTokenStorage, useClient} from \"@apibrew/react\";\n\n// setup client\nconst client = new ClientImpl('<instance-url>:<httpPort>')\n\n// setup token storage (we will use localStorage as token storage)\nclient.useTokenStorage(new LocalStorageTokenStorage())\n\n// Setup client in root component.\nexport function App() {\n\n  return <ClientProvider value={client}>>\n    {/*...*/}\n    {/*other codes*/}\n    {/*...*/}\n  </ClientProvider>;\n}\n\n// now in any component you can access to client through useClient hook.\n\nexport function Component1() {\n  const client = useClient();\n\n  // ... //\n  return <div/>\n}"
};
  