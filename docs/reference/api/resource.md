---
title: Api / Resource
description: Resource Api is used to return resource/schema definition of a resource.
---

### Overview

Resource Api is used to return resource/schema definition of a resource.

### Specification

```curl
curl -X 'GET' \
  'http://localhost:9009/{item}/_resource'
  
Response: 
{
  ...resourceDefinition
}
```
