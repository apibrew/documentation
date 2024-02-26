import {useRepository, useClient, useRecords, EntityInfo} from '@apibrew/react'

export function Component1() {
  // option 1
  const client = useClient();

  const repository = client.repository(BookEntityInfo);

// Or there are also different ways to get repo
  const repository = client.repo(BookEntityInfo);

// you can also setup generic record repository if you don't have model
  const resource = await client.getResourceByName('default', 'Book');
  const repository = client.repository(EntityInfo.fromResource(resource));

  // option 2
  const repository = useRepository<Book>(BookEntityInfo);

  // option 3
  const books = useRecords<Book>(BookEntityInfo);

  return <div/>;
}
