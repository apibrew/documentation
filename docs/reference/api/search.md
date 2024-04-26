---
title: Api / Search
description: Search for a specific item in the database.
---

### Overview

Search Api is used to search for a specific item(s). This api is an alternative to List Api. The main difference between
List and Search Api is that Search Api is used to do more complex queries.

### Specification

```curl
curl -X 'POST' \
  'http://localhost:9009/book/_search' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
  "filters": {<filters>},
  "limit": <limit>,
  "offset": <offset>,
  "query": {<query>},
  "resolveReferences": [<resolveReferences>],
}'
```

- **limit**: The number of items to return. Default is 10.
- **offset**: The number of items to skip. Default is 0.
- **filters**: The filters to apply. Example: `{"name": "John"}`.
- **query**: The query to search for.
- **resolveReferences**: The references to resolve. Example: `["$.author", "$.publisher"]`.

**_Note_**: All fields are optional.
**_Note_**: filters and query are mutually exclusive. If both are provided, only query will be used.

### Filters

Filters are used to filter the results. Filters are applied on the fields of the item.

Filters are in `{[key: string]: any}` format. Where key is property name and value is the value to filter on.

#### Example

```json
{
  "filters": {
    "name": "John",
    "age": 25
  }
}
```

This will filter the items where name is John and age is 25.

Alternatively you can use an array to filter on multiple values:

```json
{
  "filters": {
    "name": [
      "John",
      "John2"
    ]
  }
}
```

This will filter the items where name is John or John2.

### Query

Query is used to search for a specific item(s). Query is a json object.

Query is in object format. Query object can have following fields:

- **and**: Array of expressions. All queries must match.
- **or**: Array of expressions. At least one query must match.
- **not**: expression. Query must not match.
- **filters**: list of filters.
- **equal**: deprecated. Use filters instead.
- **greaterThan**: Greater than
- **greaterThanOrEqual**: Greater than or equal
- **lessThan**: Less than
- **lessThanOrEqual**: Less than or equal
- **in**: In
- **isNull**: Is null

#### Example

##### And

```json
{
  "query": {
    "and": [
      {
        "filters": {
          "name": "John"
        }
      },
      {
        "filters": {
          "age": "25"
        }
      }
    ]
  }
}
```

This query will be same as:

```json
{
  "filters": {
    "name": "John",
    "age": "25"
  }
}
```

##### Or

```json
{
  "query": {
    "or": [
      {
        "filters": {
          "name": "John"
        }
      },
      {
        "filters": {
          "age": "25"
        }
      }
    ]
  }
}
```

This query will return items where name is John or age is 25.

##### Not

```json
{
  "query": {
    "not": {
      "filters": {
        "name": "John"
      }
    }
  }
}
```

##### Filters

```json
{
  "query": {
    "filters": {
      "name": "John",
      "surname": [
        "Doe",
        "Smith"
      ]
    }
  }
}
```

This query will return items where name is John and surname is Doe or Smith.

##### Greater Than

```json
{
  "query": {
    "greaterThan": {
      "left": {
        "property": "age"
      },
      "right": {
        "value": "25"
      }
    }
  }
}
```

##### Greater Than or Equal

```json
{
  "query": {
    "greaterThanOrEqual": {
      "left": {
        "property": "age"
      },
      "right": {
        "value": "25"
      }
    }
  }
}
```

##### Less Than

```json
{
  "query": {
    "lessThan": {
      "left": {
        "property": "age"
      },
      "right": {
        "value": "25"
      }
    }
  }
}
```

##### Less Than or Equal

```json
{
  "query": {
    "lessThanOrEqual": {
      "left": {
        "property": "age"
      },
      "right": {
        "value": "25"
      }
    }
  }
}
```

##### In

```json
{
  "query": {
    "in": {
      "left": {
        "property": "age"
      },
      "right": {
        "values": [
          "25",
          "26"
        ]
      }
    }
  }
}
```

Alternatively you can use `filters`:

```json
{
  "query": {
    "filters": {
      "age": [
        "25",
        "26"
      ]
    }
  }
}
```

If property is a reference, only IDs can be used in `values`.

```json
{
  "query": {
    "in": {
      "left": {
        "property": "author"
      },
      "right": {
        "values": [
          "a39621a4-6d48-11ee-b962-0242ac120002",
          "a39621a4-6d48-11ee-b962-0242ac120003"
        ]
      }
    }
  }
}
```

##### Is Null

```json
{
  "query": {
    "isNull": {
      "property": "age"
    }
  }
}
```

##### Is Not Null

```json
{
  "query": {
    "not": {
      "isNull": {
        "property": "age"
      }
    }
  }
}
```

**_Note_**: In query object, only one of query field can be used at a time.

**_Valid_**:

```json
{
  "query": {
    "and": [
      {
        "filters": {
          "name": "John"
        }
      },
      {
        "filters": {
          "age": "25"
        }
      }
    ]
  }
}
```

```json
{
  "query": {
    "and": [
      {
        "filters": {
          "name": "John"
        }
      },
      {
        "or": [
          {
            "filters": {
              "name": "John2"
            }
          },
          {
            "filters": {
              "age": "25"
            }
          }
        ]
      }
    ]
  }
}
```

**_Invalid_**:

```json
{
  "query": {
    "and": [
      {
        "filters": {
          "name": "John"
        }
      },
      {
        "filters": {
          "age": "25"
        }
      }
    ],
    "or": [
      {
        "filters": {
          "name": "John"
        }
      },
      {
        "filters": {
          "age": "25"
        }
      }
    ]
  }
}
```

It is invalid because both `and` and `or` are used at the same level.

### Resolve References

Resolve References is used to resolve the references in the item. This is useful when you want to get the referenced
item

Resolve References is in `[string]` format. Where string is the path to the reference.

#### Example

```json
{
  "resolveReferences": [
    "$.author",
    "$.publisher"
  ]
}
```

This will resolve the author and publisher references in the item.

### Response without resolveReferences

```json
{
  "items": [
    {
      "id": "a39621a4-6d48-11ee-b962-0242ac120002",
      "name": "John",
      "age": 25,
      "author": {
        "id": "a39621a4-6d48-11ee-b962-0242ac120003"
      },
      "publisher": {
        "id": "a39621a4-6d48-11ee-b962-0242ac120004"
      }
    }
  ],
  "total": 1
}
```

### Response with resolveReferences

```json
{
  "items": [
    {
      "id": "a39621a4-6d48-11ee-b962-0242ac120002",
      "name": "John",
      "age": 25,
      "author": {
        "id": "a39621a4-6d48-11ee-b962-0242ac120003",
        "name": "John Doe"
      },
      "publisher": {
        "id": "a39621a4-6d48-11ee-b962-0242ac120004",
        "name": "Publisher"
      }
    }
  ],
  "total": 1
}
```
