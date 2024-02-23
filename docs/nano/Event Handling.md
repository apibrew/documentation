---
sidebar_position: 1
---

# Event Handling

## Overview

In **Api Brew** with help of **Nano Code** you can listen to events and perform actions based on them.

Quick example:

```javascript
on('Book:create', (book) => {
    console.log('Book created', book)
})
```

### Syntax

```javascript
/**
 * Calculates the sum of two numbers.
 * @param {string} eventHandler - Event Handler expression
 * @param {function(object, object, object)} callback - Callback function
 * @return {void} - No return value.
 *
 * @callback callback - Callback function which is called when event is triggered.
 * @param {object} item - Item which is being created/updated/etc. (like book, user, etc.)
 * @param {object} event - Event object which contains information about event.
 * @param {object} resource - Resource object which contains information about resource.
 */
function on(eventHandler, callback) {
    return a + b;
}
```

#### Event Handler expression

Event Handler expression is a string which is used to define which event you want to listen to.

It has the following format:

```text
eventHandler = <type>:<action>
```

Where: