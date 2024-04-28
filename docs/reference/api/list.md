---
title: Api / Listing
description: List items.
---

### Overview

List Api is used to list items in ApiBrew.

### Specification

```curl
curl -X 'GET' \
  'http://localhost:9009/book' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json'

Response:
{
  "content": [<item>],
  "total": <total>
}
```

**_Query Params:_**

- **limit**: The number of items to return. Default is 10.
- **offset**: The number of items to skip. Default is 0.
- **[filters]**: The filters to apply. Example: http://localhost:9009/book?name=John
  or http://localhost:9009/book?name=John&age=25 .
- **resolve-references**: The references to resolve.
  Example: http://localhost:9009/book?resolve-references=$.author,$.publisher .

**_Response body:_**

- **content**: The items.
- **total**: The total number of items.

- **_Note_**: All fields are optional.
- **_Note_**: filters and query are mutually exclusive. If both are provided, only query will be used.
- **_Note_**: Response items will contain "type" property, where it is resource type (e.g. Book, Author, etc.). This
  field can be omitted.

### Filters

Filters are used to filter the results. Filters are applied on the fields of the item.

For more information on filters, see "Filters" section on [Search](search.md) api.

For more information on resolving references, see "Resolving references" section on [Search](search.md) api.
