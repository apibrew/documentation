---
title: Api / Apply
description: Update a new item.
---

### Overview

This api is used to either create or update an existing item in ApiBrew.

First, you need to define a Resource in ApiBrew. Then you can create a new item in that resource using this api.

### Specification

```curl
curl -X 'PATCH' \
  'http://localhost:9009/{item}' \
  -H 'accept: application/json \
  -H 'Authorization Bearer <token> \
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

This will first check if there are any items with name John. If there are any items with name John, then it will update
the item with name John with age 25. If there are no items with name John, then it will create a new item with
name John and age 25.

#### Rules

- As a rule, this Api will only work if one of unique properties is provided in the payload. If no unique property is
  provided,
  then it will return an error.
- If there are multiple items with the same unique property, then it will use all of them to locate the item to update.
- If after locating the item, no matching item is found, then it will create a new item.

For more details, see create and update apis. Depending on the result of the search, it will work either as create or as
update
