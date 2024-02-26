import io.apibrew.client.Client;
import io.apibrew.client.EntityInfo;
import io.apibrew.client.Repository;
import io.apibrew.client.model.Resource;

...

Repository<Book> repository = client.repository(Book.class);

// Or there are also different ways to get repo
Repository<Book> repository = client.repo(Book.class);
Repository<Book> repository = client.repository(Book.entityInfo);
Repository<Book> repository = client.repo(Book.entityInfo);

// you can also setup generic record repository if you don't have model
Resource resource = client.getResourceByName("default", "Book");
Repository<GenericRecord> repository = client.repository(EntityInfo.fromResource(resource));
