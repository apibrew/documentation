---
title: Api / Load
description: Load an item by given properties.
---

### Overview

Load Api is used to load an existing item. This api is used to load an existing item in ApiBrew.

It works similar to Apply Api, but it is just returning the item which is located. But the logic for locating item is
same

### Specification

```curl
curl -X 'POST' \
  'http://localhost:9009/{item}/_load' \
  -H 'Authorization Bearer <token>' 
  -H 'Content-Type: application/json' \
  -d '{<payload>}'
  
Response: 
{
  "id": <id>,
  "type": <resource-type>,
  ...otherProperties
}
```

If the item is found, then the response will be `200 OK` with the item. If the item is not found, then the response will
be `404 Not Found`.

### Example

```json
{
  "name": "John"
}
```

This will load the item with name John. If the item is found, then it will return the item.

**_Response:_**

```json
{
  "id": "1234",
  "name": "John",
  "age": 25
}
```

#### Rules

- As a rule, this Api will only work if one of unique properties is provided in the payload. If no unique property is
  provided, then it will return an error.
- If there are multiple items with the same unique property, then it will use all of them to locate the item to update.
