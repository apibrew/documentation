import io.apibrew.client.Client;
import io.apibrew.client.ext.ExtensionService;
import io.apibrew.client.ext.impl.PollerExtensionService;

...

Client client = Client.newClient();

// hosted extension service
ExtensionService extensionService = new HostedExtensionServiceImpl("test-service-name", client, "extension-service-host", 8080, "http://test-service-host-proxy:8080");

// poller extension service
ExtensionService extensionService = new PollerExtensionService("test-service", client, "test-service-chan");

// handler codes

// If you want to run extensionService in foreground
extensionService.run();
// If you want to run extensionService in background
extensionService.runAsync();
