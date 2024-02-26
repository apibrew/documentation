
export const setupRepositoryFiles = {
  "golang": "package main\n\nimport \"github.com/apibrew/apibrew/pkg/client\"\n\n...\n\nrepository := client.Repository[Book](BookMapperInstance)\n\n// Or there are also different ways to get repo\nrepository := client.Repo[Book](BookMapperInstance)\n\n// you can also setup generic record repository if you don't have model\nresource, err := client.GetResourceByName(\"default\", \"Book\")\n\nif err != nil {\n    log.Fatal(err)\n}\n\nrepository := client.Repository[client.GenericRecord](client.GenericRecordMapper(resource))",
  "java": "import io.apibrew.client.Client;\nimport io.apibrew.client.EntityInfo;\nimport io.apibrew.client.Repository;\nimport io.apibrew.client.model.Resource;\n\n...\n\nRepository<Book> repository = client.repository(Book.class);\n\n// Or there are also different ways to get repo\nRepository<Book> repository = client.repo(Book.class);\nRepository<Book> repository = client.repository(Book.entityInfo);\nRepository<Book> repository = client.repo(Book.entityInfo);\n\n// you can also setup generic record repository if you don't have model\nResource resource = client.getResourceByName(\"default\", \"Book\");\nRepository<GenericRecord> repository = client.repository(EntityInfo.fromResource(resource));",
  "javascript": "import {Client, Repository, GenericRecord} from '@apibrew/client';\n\n// ... //\n\nconst repository = client.repository(BookEntityInfo);\n\n// Or there are also different ways to get repo\nconst repository = client.repo(BookEntityInfo);\n\n// you can also setup generic record repository if you don't have model\nconst resource = await client.getResourceByName('default', 'Book');\nconst repository = client.repository(EntityInfo.fromResource(resource));",
  "python": "from apibrew import Client, Repository, GenericRecord\n\n...\n\nrepository = client.repository(Book)\n\n# Or there are also different ways to get repo\nrepository = client.repo(Book)\n\n# you can also setup generic record repository if you don't have model\nresource = client.get_resource_by_name('default', 'Book')\nrepository = client.repository(EntityInfo.from_resource(resource))",
  "react": "import {useRepository, useClient, useRecords, EntityInfo} from '@apibrew/react'\n\nexport function Component1() {\n  // option 1\n  const client = useClient();\n\n  const repository = client.repository(BookEntityInfo);\n\n// Or there are also different ways to get repo\n  const repository = client.repo(BookEntityInfo);\n\n// you can also setup generic record repository if you don't have model\n  const resource = await client.getResourceByName('default', 'Book');\n  const repository = client.repository(EntityInfo.fromResource(resource));\n\n  // option 2\n  const repository = useRepository<Book>(BookEntityInfo);\n\n  // option 3\n  const books = useRecords<Book>(BookEntityInfo);\n\n  return <div/>;\n}"
};
  