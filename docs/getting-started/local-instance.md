---
sidebar_position: 3
---

# Local Instance

For setting up local instance, you can easily run **Api Brew** on your local machine using **docker**.

```
docker run -v $(pwd)/data:/var/lib/postgresql/data -p 9009:9009 tislib/apibrew:full-latest
```