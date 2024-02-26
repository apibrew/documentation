from apibrew import Client

client = Client.new_client()

# Create new resource.
resource = {
  'name': 'Person',
  'properties': [
    {'name': 'name', 'type': 'string', 'required': True},
    {'name': 'description', 'type': 'string'},
  ]
}

created_resource = client.create_resource(resource)

# Get resource by name.
resource_by_name = client.get_resource_by_name('default', 'Person')

# Update resource.
resource_by_name['properties'].append({'name': 'age', 'type': 'int32'})
updated_resource = client.update_resource(resource_by_name)

# List resources.
resources = client.list_resources()

# Get resource by id.
resource_by_id = client.get_resource_by_id(created_resource['id'])

# Delete resource.
client.delete_resource(resource)

# Apply resource.
applied_resource = client.apply_resource(resource)
