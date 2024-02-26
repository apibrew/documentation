from apibrew import Client
from apibrew.ext import HostedExtensionServiceImpl, PollerExtensionService

...

client = Client.new_client()

storage_service = StorageServiceImpl(client, "https://storage.apibrew.io:8443/<your-project-id>")

# Uploading file

# First you need to create a new StorageObject
storage_object = {}

storage_object = storage_service.repository().create(storage_object)

# Then you can upload file
# There are multiple ways to upload file

# 1. From byte array
byte_array = bytes([1, 2, 3, 4])
storage_service.upload_bytes(storage_object["id"], byte_array, "test.txt")

# 2. From file
file_path = "test.txt"
storage_service.upload_file(storage_object["id"], file_path)

# Downloading file

# 1. To byte array
bytes_buffer = storage_service.download_bytes(storage_object["id"])

# 2. To file
storage_service.download_file(storage_object["id"], "test.txt")
