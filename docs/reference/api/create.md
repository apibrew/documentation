---
title: Api / Create
description: Create a new item.
---

### Overview

Create Api is used to create a new item. This api is used to create a new item in ApiBrew.

First, you need to define a Resource in ApiBrew. Then you can create a new item in that resource using this api.

### Specification

```curl
curl -X 'POST' \
  'http://localhost:9009/{item}' \
  -H 'accept: application/json
  -H 'Authorization Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{<payload>}'
  
Response: 
{
  "id": <id>,
  "type": <resource-type>,
  ...otherProperties
}
```

- **payload**: The payload to create the item. Example: `{"name": "John", "age": 25}`.

### Example

```json
{
  "name": "John",
  "age": 25
}
```

This will create a new item with name John and age 25.

- **_Note_**: Request and Response are in JSON format.
- **_Note_**: Both Request and Response uses same schema. The schema is defined in the Resource definition.
- **_Note_**: The id is generated by the server. It is in uuid type. It is unique for each item. It is returned in the
  response.**
- **_Note_**: Request and response item may contain "type" property, where it is resource type (e.g. Book, Author,
  etc.). This
  field can be omitted.

### Resolving references:

Let's imagine that we have a `Person` resource and a `City` resource. The `Person` resource has a reference to
the `City` resource. When creating a new `Person`, we need to provide the `id` of the `City` resource. Here is an
example:

City object:

```json
{
  "name": "London",
  "description": "Capital of England"
}
```

Person object;

```json
{
  "name": "John",
  "age": 25,
  "city": {
    "id": "city-id"
  }
}
```

Another Person object (valid);

```json
{
  "name": "John",
  "age": 25,
  "city": {
    "id": "city-id"
  }
}
```

Another Person object (valid);

```json
{
  "name": "John",
  "age": 25,
  "city": {
    "name": "London"
  }
}
```

Another Person object (invalid);

```json
{
  "name": "John",
  "age": 25,
  "city": {
    "description": "Capital of England"
  }
}
```

The problem in last example, is that, description is not unique, so ApiBrew cannot locate the city with the provided
information. So, it is important to provide unique information to resolve references.
