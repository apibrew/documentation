---
sidebar_position: 1
---

# The Big Picture

## Overview

This is high level overview of Api brew.

![](/files/fundamentals/apibrew-quick.png)

**ApiBrew** is a platform. You have 3 way to interact with it.

1. **apbr CLI** - Command line interface
2. **Studio** - Web based UI
3. **API** - RESTful API

The purpose of ApiBrew is to create well documented APIs for you.

In ApiBrew, there are 2 main elements.

1. **Resource** - Api / Data model / Table
2. **Record** - Data / Item
3. **Nano Code** - Your logic to customize Resource

### Resource
![](/files/fundamentals/resource.png)

A **resource** is a data model, Api, and database table.

When you create a resource, you are creating a data model, a database table, and a RESTful API endpoint. Everything is
done by just creating a resource.

#### Example of resource

```yaml
type: resource
name: Book
properties:
  title:
    type: string
  name:
    type: string
```
```bash
apbr apply -f book.yaml
```

So, by just executing this command, you are creating a data model, a database table, and a RESTful API endpoint, all in once (they are just part of Resource)

### Record

A Record is a data. It is an instance of a resource.

When you create a resource, you get an API to manage records.

You can also manage records via **apbr CLI** or **Studio**.

#### Example of record

```yaml
type: Book
title: "The Great Gatsby"
name: "F. Scott Fitzgerald"
```
```bash
apbr create -f book-1.yaml
```

So, by just executing this command, you are creating a record in the database.

### Nano Code

Nano code is a way to customize the behavior of resources and records.

You can add your own logic to resources and records by using Nano code.

For example, you can add a new event handler to the resource and modify the behavior of the resource.

[More about Nano code](/nano/getting-started)


