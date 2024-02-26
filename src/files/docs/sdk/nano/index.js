import {Client} from '@apibrew/client';
import {HostedExtensionServiceImpl, PollerExtensionService} from '@apibrew/client/ext';

// ... //

const client = Client.newClient();

// hosted extension service
const extensionService = new HostedExtensionServiceImpl("test-service-name", client, "extension-service-host", 8080, "http://test-service-host-proxy:8080");

// poller extension service
const extensionService = new PollerExtensionService("test-service", client, "test-service-chan");

// handler codes

// If you want to run extensionService in foreground
extensionService.run();
// If you want to run extensionService in background
extensionService.runAsync();
