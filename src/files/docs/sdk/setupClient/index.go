package main

import "github.com/apibrew/apibrew/pkg/client"

func main() {
    // Use one of following methods to create client

    // Option 1. Create client from default config (from apbr config file)
    client := client.NewClient()

    // Option 2. By Apbr URL (you need to authenticate separately)
    client := client.NewClient("https://apbr.io")

    // Option 3. By separate profile
    client := client.NewClientByServerName("my-profile")

    // Option 4. Inline config
    client := client.NewClientByServerConfig(&client.Server{
        Host: "localhost",
        Port: 9009,
        HttpPort: 9009,
        Insecure: true,
        Authentication: &client.Authentication{ // either username/password or token can be used for authentication.
            Username: "admin",
            Password: "admin",
            Token: "token123",
        },
    })
}
