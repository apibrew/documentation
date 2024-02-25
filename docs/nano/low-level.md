# Low Level

## Generic Event Handling

In **Api Brew** with help of **Nano Code** you can listen to events and perform actions based on them.


### Examples
Quick example:

Operate on Book creation event:
```javascript
on('Book:create', (book) => {
    console.log('Book created', book)
})
```

Operate on Book creation event(same as previous example):
```javascript
on('Book:beforeCreate', (book) => {
    console.log('Book created', book)
})
```

Operate on all create events.
```javascript
on('system/*:beforeCreate', (book) => {
    console.log('Book created', book)
})
```

Operate on all create events where resource has PreventDelete annotation set true.
```javascript
on('[PreventDelete=true]:delete', (record) => {
    throw new Error("You can't delete this record")
})
```

You can set annotations to resources by following way:
```yaml
type: resource
name: Book
properties:
    title:
        type: string
annotations:
  PreventDelete: true
...
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
type = <namespace>/<resource> | <namespace>/* | <resource>
action = <order><action> | <order> | <action>
order = before | after | on(:orderId)
action = create | update | delete | get | list
```

#### Example Expressions
```text
Book:create
Book:beforeCreate
system/*:beforeCreate
[PreventDelete=true]:delete
Book:on(100):create
Book:on(40)
```

## Send Mail

You can send mail with help of `mail` function.

### Syntax

```javascript
/**
 * Send mail
 * @param {string} to - Receiver email address
 * @param {string} subject - Mail subject
 * @param {string} body - Mail body
 * @return {void} - No return value.
 */
