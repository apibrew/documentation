---
sidebar_position: 2
---

# Lambda

With help of Lambda you can implement event handling mechanism and lambda architecture.

There are 3 main components of Lambda

- **Lambda Resource** - Structure of Lambda event
- **Fire** - Event sending mechanism
- **Listen** - Event handling mechanism

Fire method are asynchronous and it will not block execution flow.

Lambda resources mostly defined as virtual resources. And they are used to define event, no need to events in Database

**Example:**  
First we need to define Lambda resource

```yaml
type: resource
name: UserActionLambda
virtual: true
properties:
  user:
    type: REFERENCE
    reference:
      resource: User
      namespace:
        name: system
  action:
    type: STRING
```

Then we can use this Lambda resource

```js
const UserActionLambda = lambda('UserActionLambda');
const SystemUser = resource('system/User');

UserActionLambda.listen((event) => {
  console.log('Handling UserAction', event);
});

SystemUser.afterCreate(user => {
  UserActionLambda.fire({
    user: user,
    action: 'create'
  });
});
```

**lambda** function is for defining lambdas and working similar to resource function

Lambdas can be handled and fired in different nano codes as well.