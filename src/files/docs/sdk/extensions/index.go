package main

import "github.com/apibrew/apibrew/pkg/client"

...

client := client.NewClient()

// hosted extension service
extensionService := client.NewHostedExtensionService("test-service-name", "extension-service-host", 8080, "http://test-service-host-proxy:8080")

// poller extension service
extensionService := client.NewPollerExtensionService("test-service", "test-service-chan")

// handler codes

// If you want to run extensionService in foreground
extensionService.Run()

// If you want to run extensionService in background
extensionService.RunAsync()

