---
sidebar_position: 2
---

# Http

Nano code supports http client. You can make http requests to any server.

Its syntax is pretty straightforward.

http.\[methodName\](url, data, options)

options is optional parameter, it is used to set headers

http client is immediately executed, it is not asynchronous. And it is returning response object.

**Example:**

```js
const SystemUser = resource('system/User');

SystemUser.afterCreate(user => {
    const response = http.post('https://my-server.com/api/users', user, {
        headers: {
            "Content-Type": 'application/json'
        }
    );

    console.log(response.status);
    console.log(response.body);
});
```