---
title: Api / Delete
description: Delete an item.
---

### Overview

Delete Api is used to delete an existing item. This api is used to delete an existing item in ApiBrew.

### Specification

```curl
curl -X 'DELETE' \
  'http://localhost:9009/{item}/{id}' \
  -H 'Authorization Bearer <token>' 
```

If the item is deleted successfully , then the response will be `204 No Content`. If the item is not found, then the
response will be `404 Not Found`.
