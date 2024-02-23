---
sidebar_position: 2
---

# Getting Started

## Overview

ApiBrew is not a bullet proof solution for all your needs. Sometimes you need to add some custom logic to your API.  
**Nano Code** is a way to add custom logic to your API.  
With combination of **Nano Code** and **Api Brew** you can create a powerful API, you can do almost anything, **easily**.

**It is a serverless solution**. You do not need to worry about **hosting**, **scaling** of your code.

```yaml
type: resource
name: Book
properties:
  name:
    type: STRING
  description:
    type: STRING
```



```js
const Book = resource('Book');

Book.beforeCreate(book => {
  if (!book.description) {
      book.description = book.name + ' description';
  }
});
```



Now you can deploy your code to nano engine.

```bash
apbr deploy -f your-code.js
```

The main difference between **Nano Code** and SDK is that **Nano Code** is a deployed into Api Brew. And you do not need to run it by yourself. It is running inside ApiBrew instance.

---

## How it works?

Basically, when you deploy a **Nano Code** to Api Brew, it will be executed inside ApiBrew instance **Nano module**.

Nano code is set of statements. Where each statement answers two basic question.

- When to do?
- What to do?

By answering this questions, you can define your nano code and deploy it.

Inside ApiBrew there are **resources** and **records**. Each **record** has a set of actions and each action has a ordered execution flow.

There are 4 types of action:

- Create
- Update
- Delete
- Get
- List

Resource ==>Action ==> Operation

You can register your function before or after each action

---

## Supported functionality

Nano code supports all **ES5** features.