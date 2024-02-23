---
sidebar_position: 2
---

# Quick Start Guide

Api Brew is a platform which allows you to create, manage and deploy APIs. It is designed to be easy to use and
flexible. It is built on top of **Kubernetes** and **docker**. It is designed to be used by developers, architects and
business users.

## What you need

- **Api Brew** instance
- **apbr** (client tool)

**ApiBrew is not generating any code.** It is a platform which allows you to create, manage and deploy APIs. It is
designed
to be easy to use and flexible. It is built on top of **Kubernetes** and **docker**. It is designed to be used by
developers, architects and business users.

## Getting started with _apbr_ (client tool)

_apbr_ is a command line tool which allows you to interact with **Api Brew**. You can use it to create, manage and
deploy APIs.

### Installation

There are two ways to install _apbr_:

#### Download binary from [releases](https://github.com/apibrew/apibrew/releases/latest) page

- Go to [release page](https://github.com/apibrew/apibrew/releases/latest)
- Download apbr binary file apbr-linux-arm64, rename it to apbr
- Put it to bin folder

### Configuring

We are assuming you already have an **api-brew instance** running. 

*If you don't have one, you can register* on cloud or setup local instance.
1. in [our cloud](https://studio.apibrew.io) and get a free instance
2. Setup it locally [locally](/getting-started/local-instance).

Now you need to configure _apbr_ to connect to your **api-brew instance**.

There are two ways to configure _apbr_:

You can configure _apbr_

```bash
apbr configure
Address: (your-project.api-brew.io:9443)
Username: (your username)
Password: (your password)
Insecure[false]: (false)
```

## Creating a simple resource

#### Declare book.yml

Let's define our first resource. We will create a **book** resource.  
We will define it in a file called **book.yml**

```yaml
type: resource
name: Book
title: Book
description: A book
properties:
  title:
    type: STRING
    unique: true
    required: true
  description:
    type: STRING
  author:
    type: REFERENCE
    reference: Author
```

#### Apply book.yml

Now we can apply this file to our **api-brew instance**

```bash
apbr apply -f book.yml
```

#### You can also use swagger to operate with your resources:

Navigate to Swagger docs url  
**https://(project-name).apibrew.io:8443/docs/swagger/index.html**  
you need to replace (project-name) with your project name

![](https://apibrew.io/files/docs/getting-started/swagger-book.png)

