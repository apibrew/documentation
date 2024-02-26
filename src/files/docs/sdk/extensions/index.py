from apibrew import Client
from apibrew.ext import HostedExtensionServiceImpl, PollerExtensionService

...

client = Client.new_client()

# hosted extension service
extension_service = HostedExtensionServiceImpl("test-service-name", client, "extension-service-host", 8080, "http://test-service-host-proxy:8080")

# poller extension service
extension_service = PollerExtensionService("test-service", client, "test-service-chan")

# handler codes

# If you want to run extensionService in foreground
extension_service.run()
# If you want to run extensionService in background
extension_service.run_async()
