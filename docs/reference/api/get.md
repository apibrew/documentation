---
title: Api / Get
description: Get an item by id.
---

### Overview

Get Api is used to get an existing item. This api is used to get an existing item in ApiBrew.

### Specification

```curl
curl -X 'GET' \
  'http://localhost:9009/{item}/{id}' \
  -H 'Authorization Bearer <token>' 
  
Response: 
{
  "id": <id>,
  "type": <resource-type>,
  ...otherProperties
}
```

If the item is found, then the response will be `200 OK` with the item. If the item is not found, then the response will
be `404 Not Found`.

