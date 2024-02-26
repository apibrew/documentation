from apibrew import Client, Repository, GenericRecord

...

repository = client.repository(Book)

# Or there are also different ways to get repo
repository = client.repo(Book)

# you can also setup generic record repository if you don't have model
resource = client.get_resource_by_name('default', 'Book')
repository = client.repository(EntityInfo.from_resource(resource))
