import {Client, Repository, GenericRecord} from '@apibrew/client';

// ... //

const repository = client.repository(BookEntityInfo);

// Or there are also different ways to get repo
const repository = client.repo(BookEntityInfo);

// you can also setup generic record repository if you don't have model
const resource = await client.getResourceByName('default', 'Book');
const repository = client.repository(EntityInfo.fromResource(resource));
