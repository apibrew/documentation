---
sidebar_position: 2
---
import {SwaggerApi} from '../../src/components/open-api/swagger-api'
import MetaJson from '../../src/meta.json'

# Authorization

### Overview

**Authorization** is a process of checking if user has access to the resource.

In _Api Brew_ authorization is done by **Role based access control**. There are 3 main elements in **RBAC**:

![](/files/docs/fundamentals/authorization/rbac.png)

### Authorization elements

**User** is a person who is using the system.  
**Role** is a permission holder which can be assigned to multiple users.  
**Permission** is a set of rules which defines what user can do.

A single User can have multiple Roles. A single Role can have multiple Permissions.  
It gives you flexibility to either directly assign Permissions to User or to assign Role to User.

### Authorization process

When you log in, you get a **JWT token** which contains your**user id**, **roles** and **permissions**.

When you make a request to the API, **Api Brew** checks if you have access to the specific resource and specific action.  
For example. If you access to books API and you want to create a book, **Api Brew** will check if you have **create** permission for **books** resource.

Permission is a combination of **matching conditions**.

When you send a request. **Api Brew** will evaluate all of your permissions (from JWT) and filter out them with is not matching.  
After having matched permissions, **Api Brew** will check if any of them is allowing you to access the resource.  
As a rule. For being able to access the resource and operation on it, you need to have at least **ONE** with **ALLOW** permit. And you must have **ZERO** permission which is **REJECT**.  
Basically, you can think like, no permission should have reject but at least one permission must have allow.

Permission system is not checked if resource/operation has public access

If Authentication is disable from API Brew config. Then all requests will be allowed. No permission checking will be done.

When creating **Roles** or **Users**, you should not create permission separately, permissions must be inside User or Role

### Examples:

#### Example 1

```yaml
# User
type: system/User
username: joe
password: doe
permissions:
  - action: create
    namespace: default
    resource: book
```

From user joe, we can say that he has permission to create books. But he cannot delete or get books

#### Example 2

```yaml
# User
type: system/User
username: joe
password: doe
permissions:
  - action: create
    namespace: default
    resource: book
roles:
  - name: test-role
---
###
# Role
type: system/Role
name: test-role
permissions:
  - action: read
    namespace: default
    resource: book
```

Now, From user joe, we can say that he has permission to create books and read role. But he cannot delete books. You can see that we have created a role and assigned it to user. So user has permissions from both role and from its own.

**Note:** You can use general API for creating user and role. Like user and role are ordinary resources, they are working same way other resources are working

**Note:** if you want a resource to be public, you can set AllowPublicAccess annotation to Resource