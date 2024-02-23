---
sidebar_position: 4
---

# SDK
## Overview

**SDK** is a set of libraries for working with Api Brew.  
It is different from nano in following ways:

- **SDK** - your code is hosed in your repository. Mostly it is in client side (browser, mobile app, etc.). But it can be in server side as well.  
  **Nano** - your code is hosted in Api Brew. It is inside nano engine. There are no client side code. (you can still use resources in client side, but you cannot write nano code in UI)
- **SDK** - it has full functionality of Api Brew.  
  **Nano** - is has limited functionality.

---

## Supported languages

Currently **SDK** supports **JavaScript**, **TypeScript**, **Java**, **Python**, **Golang**.

You can also interact with API Brew through **REST API** or **GRPC API**. It means that, even if sdk not available to some language, you can still use it.

---

## Setup SDK

You need to get **SDK** for your language from its package manager.

Java

JavaScript/Typescript

React

Python

Golang

```bash
Gradle:
implementation 'com.apibrew:client:latest'

Maven:
<dependency>
  <groupId>com.apibrew</groupId>
  <artifactId>client</artifactId>
  <version>latest</version>
</dependency>
```

---

## Setup Client

Client is the main and lowest level library of **SDK**.  
It is responsible for communication with Api Brew.  
For any sdk functionality to work, the first thing you need is to setup client.

### Setup

There are various ways to setup client.  
Client is reading ~/.apbr/config.yml file for configuration. (which is also used by apbr)

Java

JavaScript / Typescript

React

Python

Golang

```java
import io.apibrew.client.Client;

public class Application {

    public static void main(String[] args) {
        // Use one of following methods to create client

        // Option 1. Create client from default config (from apbr config file)
        Client client = Client.newClient();

        // Option 2. By Apbr URL (you need to authenticate separately)
        Client client = Client.newClient("https://apbr.io");

        // Option 3. By separate profile
        Client client = Client.newClientByServerName("my-profile");

        // Option 4. Inline config
        Config.Server server = new Config.Server();
        server.setHost("localhost");
        server.setPort(9009);
        server.setHttpPort(9009);
        server.setInsecure(true);
        Config.Authentication authentication = new Config.Authentication();
        // Either username/password or token can be used for authentication.
        authentication.setUsername("admin");
        authentication.setPassword("admin");
        authentication.setToken("admin");

        server.setAuthentication(authentication);

        Client client = Client.newClientByServerConfig(server);
    }
}
```

### Resource operations

Once you have client, you can perform resource operations. (create, update, delete, etc.)

Java

JavaScript / Typescript

Python

Golang

```java
import io.apibrew.client.Client;
import io.apibrew.client.model.Resource;

import java.util.ArrayList;
import java.util.List;

public class Application {

    public static void main(String[] args) {
        Client client = Client.newClient();

        // Create new resource.
        Resource resource = new Resource();
        resource.setName("Person");

        List<Resource.Property> properties = new ArrayList<>();
        properties.add(new Resource.Property().withName("name").withType(Resource.Type.STRING).withRequired(true));
        properties.add(new Resource.Property().withName("description").withType(Resource.Type.STRING));

        resource.setProperties(properties);

        Resource createdResource = client.CreateResource(resource);

        // Get resource by name.
        Resource resourceByName = client.GetResourceByName("default", "Person");

        // Update resource.
        resourceByName.getProperties().add(new Resource.Property().withName("age").withType(Resource.Type.INT32));

        Resource updatedResource = client.UpdateResource(resourceByName);

        // List resources.
        List<Resource> resources = client.listResources();

        // Get resource by id.
        Resource resourceById = client.GetResourceById(createdResource.getId());

        // Delete resource.
        client.DeleteResource(resource);

        // Apply resource.
        Resource appliedResource = client.ApplyResource(resource);
    }
}
```

---

## Repository

Repository is a higher level library. It is responsible for managing records.  
It is available in JavaScript, TypeScript, Java, Python, Golang.  
For being able to use resource, you need to generate model first. (see [https://apibrew.io/docs/cli#command-generate](https://apibrew.io/docs/cli#command-generate))  
If you don't want to generate model, you can still use GenericRecord model.

### Setup repository

Java

JavaScript / Typescript

React

Python

Golang

```java
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
```

**Note:**  
If you use GenericRecord, you can use **getProperty** and **setProperty** methods to get/set properties dynamically.  
**getProperty** and **setProperty** is also available in generated models.

### Repository operations

**Repository** has following methods:

- **create** - create new record.
- **update** - update existing record.
- **delete** - delete existing record.
- **get** - get existing record by id.
- **apply** - create or update record.**Note!**For Apply, record must have a unique field(s). And this field(s) must be provided in payload. It means that, record payload must be uniquely identifiable.
- **list** - search records by query.
- **load** - reload record from apibrew.
- **watch** - watch record changes.

Let's see examples:

Java

JavaScript / Typescript

React

Python

Golang

```java
import io.apibrew.client.Client;
import io.apibrew.client.EntityInfo;
import io.apibrew.client.Repository;
import io.apibrew.client.model.Resource;

...

Repository<Book> repository = client.repository(Book.class);

Book book = new Book();
book.setName("Book 1");
book.setDescription("Description 1");

// Create new record.
Book createdBook = repository.create(book);

System.out.println(createdBook.getId()); // it will print id of created record.

// Update record.

// Update name
createdBook.setName("Book 2");
Book updatedBook = repository.update(createdBook);

// Delete record.
repository.delete(updatedBook.getId());

// Get record by id.
Book bookById = repository.get(createdBook.getId());

// Apply record.
Book bookToApply = new Book();
bookToApply.setName("Book 3");
bookToApply.setDescription("Description 3");

Book appliedBook = repository.apply(bookToApply);

// List records.
List<Book> books = repository.list();

// You can also use query to filter records.
List<Book> books = repository.list(ListRecordParams.builder()
                        .query(BooleanExpressionBuilder.eq("description", "Test Book"))
                        .resolveReferences("$.author") // it will preload author reference
                        .limit(2)
                        .offset(1)
                        .build());
// Load record.
Book loadedBook = repository.load(book);

// Watch record.
repository.watch((event) -> {
    System.out.println(event);
});
```

---

## Extensions & Handlers

With help of extensions and handlers you can Api Brew resources functionality.  
They are like hooks, which are executed before/after resource operations.

For detailed information about extensions and handlers, see [https://apibrew.io/docs/fundamentals#extensions](https://apibrew.io/docs/fundamentals#extensions)

### Setup extension service

We have 2 extension service implementations:

- **Hosted**  
  In this mode, Api Brew connects to your extension service. And it is sending events for execution.
- **Poller**  
  In this mode, your extension service connects to Api Brew. And it is pulling events for execution.

Let's see examples:

Java

JavaScript / Typescript

React

Python

Golang

```java
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
```

### Handlers

With help of handlers you can handle events, operate on them.  
For example, you can handle event beforeCreate on Book and do modification on item which is being created.

Handler interface has following methods:

- **when**  
  It is control to indicate when handler should be executed.
- **operate**  
  Here, you can specify how to operate on event.

Let's see examples:

Java

JavaScript / Typescript

React

Python

Golang

```java
import io.apibrew.client.Client;
import io.apibrew.client.ext.Condition;
import io.apibrew.client.ext.ExtensionService;
import io.apibrew.client.ext.Handler;
import io.apibrew.client.ext.Operator;
import io.apibrew.client.ext.impl.PollerExtensionService;

// prepare handler
Handler<User> handler = extensionService.handler(User.class);

// or
Handler<User> handler = extensionService.handler(User.entityInfo);

// operate on event
handler.when(Condition.beforeCreate())
        .operate(Operator.execute((event, user) -> {
    System.out.println("Before create:" + user);
}));

// multiple conditions (AND)
handler.when(Condition.after())
        .when(Condition.after())
        .operate(Operator.execute((event, user) -> {
    System.out.println("After create:" + user);
}));

// you can also cancel handler when needed
String operatorId = handler.when(Condition.after())
        .when(Condition.after())
        .operate(Operator.execute((event, user) -> {
    System.out.println("After create:" + user);
}));

// cancel handler
extensionService.unRegisterOperator(operatorId);
```

#### When

List of available handler conditions:

- **and** - to combine multiple conditions with AND operator.  
  `Condition.and(condition1, condition2, ...)`
- **or** - to combine multiple conditions with OR operator.  
  `Condition.or(condition1, condition2, ...)`
- **not** - to negate condition.  
  `Condition.not(condition)`
- **before** - to set the order of the extension to 10, indicating it should run before other extensions.  
  `Condition.before()`
- **after** - to set the order of the extension to 110, indicating it should run after other extensions.  
  `Condition.after()`
- **on** - to match a specific custom action.  
  `Condition.on(customActionName)`
- **create** - matches the CREATE action.  
  `Condition.create()`
- **update** - matches the UPDATE action.  
  `Condition.update()`
- **delete** - matches the DELETE action.  
  `Condition.delete()`
- **get** - matches the GET action.  
  `Condition.get()`
- **list** - matches the LIST action.  
  `Condition.list()`
- **async** - to set the extension as asynchronous.  
  `Condition.async()`
- **entityExists** - checks if the entity exists.  
  `Condition.entityExists()`
- **user** - matches specific users from the event annotations.  
  `Condition.user(expectedUsers)`
- **resource** - to specify namespace and resources for the condition.  
  `Condition.resource(namespace, ...resources)`
- **resourceFromEntityInfo** - to set resource and namespace from entity info.  
  `Condition.resourceFromEntityInfo(entityInfo)`
- **group** - matches specific groups from the event annotations.  
  `Condition.group(...expectedGroups)`

You can group this conditions to create complex conditions.

#### Operators

- **execute** - execute operator. It is for just executing some code when handler matches condition(s).  
  `handler.when(Condition.beforeCreate())  
         .operate(Operator.execute((event, entity) -> {})`  
  If you return entity from execute, it will be used as updated entity and it will be sent to Api Brew.
- **reject** - reject operator. It is for rejecting event when handler matches condition(s).  
  `handler.when(Condition.beforeCreate())  
         .operate(Operator.reject('Denied!')`
- **check** - check operator. It is for checking event when handler matches, if not matches, it will reject event. condition(s).  
  `handler.when(Condition.beforeCreate())  
         .check(predicate, 'Denied!')`