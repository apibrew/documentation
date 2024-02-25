# Miscellaneous

## Event Ordering

When you create/update/delete a record, the operation is converted to an event and it goes through the event handler
chain.

There are 3 kind of **event handlers**

1. Pre event handlers
2. Actual event handler
3. Post event handlers

**Actual event handler** is where the actual operation is performed. (Data stored to database)  
**Pre event handlers** are executed before the actual event handler.  
**Post event handlers** are executed after the actual event handler.

You can add your own event handlers to the chain. For doing that, you need to create an extension or Nano code. For more
details please go to [extension page](https://apibrew.io/docs/fundamentals/extension)
or [Nano code](https://apibrew.io/docs/nano-code/getting-started) page.

![](/files/docs/fundamentals/the-big-picture/resource-event-handling.png)

With various techniques, **_you can extend the functionality of Api brew._**  
For example, you can add a **new event handler(Extension)** to the chain and modify functionality of Resource and Api

System predefined event orders:

1. **50** - Record Validation
2. **100** - Actual handling (Data is persisted to database)
3. **200** - Audit handling (Audit log is created, if enabled)

Events can be async or sync, async events are executed after sync events despite their order.

Async events do not block the execution flow.

---