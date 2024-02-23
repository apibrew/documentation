---
sidebar_position: 1
---

# The Big Picture

## Overview

This is high level overview of Api brew.

In Api brew, everything is a resource.  
A resource represents:

1. A **data model** (e.g. a user, a post, a comment, etc.)
2. A **table** in the database
3. A **RESTful API endpoint**

![](/files/docs/fundamentals/the-big-picture/resource-namespace-diagram.png)

A namespace is a collection for grouping resources.

You can create/update/delete resources.  
By updating a **resource** you can update **the data model**, the **database table** and the **RESTful API endpoint**.

## How it works?

When any record operation is performed via resource (e.g. create/update/delete), the operation is converted to an event. And it goes from event handler chain.

There are 3 kind of **event handlers**

1. Pre event handlers
2. Actual event handler
3. Post event handlers

**Actual event handler** is where the actual operation is performed. (Data stored to database)  
**Pre event handlers** are executed before the actual event handler.  
**Post event handlers** are executed after the actual event handler.

You can add your own event handlers to the chain. For doing that, you need to create an extension or Nano code. For more details please go to [extension page](https://apibrew.io/docs/fundamentals/extension) or [Nano code](https://apibrew.io/docs/nano-code/getting-started) page.

![](/files/docs/fundamentals/the-big-picture/resource-event-handling.png)

With various techniques, **_you can extend the functionality of Api brew._**  
For example, you can add a **new event handler(Extension)** to the chain and modify functionality of Resource and Api

---