---
title: Api / Watch
description: Watch an item(s) in a resource.
---

### Overview

Watch Api is used to watch an item(s) in a resource.

### Specification

```curl
curl -X 'GET' \
  'http://localhost:9009/{item}/_watch'
  
Response: 
{"id":"heartbeat-message","action":"CREATE","actionSummary":"","actionDescription":"","finalizes":false,"sync":false,"time":"2024-04-28T09:20:33.979199Z","total":0,"actionName":""}

{"id":"internal-event-default-Book-CREATE-963029d73abb","action":"CREATE","actionSummary":"","actionDescription":"","resource":{"name":"Book","namespace":{"name":"default"}},"records":[{"id":"963f5791-c3c4-4f02-b43a-22211a79b8b6","properties":{"auditData":{"createdBy":"guest","createdOn":"2024-04-28T09:20:36Z"},"desc":"asss","id":"963f5791-c3c4-4f02-b43a-22211a79b8b6","type":"Book","version":1}}],"finalizes":false,"sync":false,"time":"2024-04-28T09:20:36.366662Z","total":0,"actionName":"","annotations":{"AllowPublicAccess":"true","EnableAudit":"true","requestUrl":"/book"}}

{"id":"internal-event-default-Book-CREATE-112f82c847d4","action":"CREATE","actionSummary":"","actionDescription":"","resource":{"name":"Book","namespace":{"name":"default"}},"records":[{"id":"2444ca1c-6109-46c9-8507-9285f6c5ecb1","properties":{"auditData":{"createdBy":"guest","createdOn":"2024-04-28T09:20:37Z"},"desc":"asss","id":"2444ca1c-6109-46c9-8507-9285f6c5ecb1","type":"Book","version":1}}],"finalizes":false,"sync":false,"time":"2024-04-28T09:20:37.056161Z","total":0,"actionName":"","annotations":{"AllowPublicAccess":"true","EnableAudit":"true","requestUrl":"/book"}}

{"id":"heartbeat-message","action":"CREATE","actionSummary":"","actionDescription":"","finalizes":false,"sync":false,"time":"2024-04-28T09:20:40.060037Z","total":0,"actionName":""}

{"id":"heartbeat-message","action":"CREATE","actionSummary":"","actionDescription":"","finalizes":false,"sync":false,"time":"2024-04-28T09:20:43.06121Z","total":0,"actionName":""}
```

With help of ApiBrew, you can build realtime applications. You can watch an item(s) in a resource and get notified when
an item is created, updated or deleted. This is useful when you want to build a realtime application.

You can also use this to build messaging, notification, chat applications. This api will be used to get notified when an
item is created, updated or deleted.

**_Query Params:_**

- **use-event-source**: If you want to use EventSource to get the events. Default is false.
- **[filters]**: The filters to apply. Example: http://localhost:9009/book/_watch?name=John
  or http://localhost:9009/book/_watch?name=John&age=25 .

Filters are used to filter the results. Filters are applied on the fields of the item.

For more information on filters, see "Filters" section on [Search](search.md) api.
