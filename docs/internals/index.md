# Internals

### Core Principles

**ApiBrew** is a tool for creating APIs and Backend in a **declarative way**. ApiBrew is also Low-Code solution.

In ApiBrew, there are 2 main element.

1. **Resource** - Resource is like your schema, API or Table in database. It represents a data structure.
2. **Record** - Record is like your data, it represents a single item of data.

With help of ApiBrew, you can define your resources and records in a declarative way. And you can define its behavior but its extensions and nano-code.

### Declarative Way

ApiBrew is designed to be used in a declarative way. You define your resources and records in a declarative way. You define its behavior in a declarative way.

Let's imagine, we want to build **Taxi Fare Calculator API**. We can define our resources and records like below.

```javascript
type: resource
name: Tariff
properties:
  name:
    required: true
    unique: true
    type: string
  distance:
    required: true
    type: int32
  rule:
    required: true
    type: string
---
type: Tariff
name: minimal
distance: 0
rule: "1.5"
---
type: Tariff
name: standard
distance: 1000
rule: "1.5 * routeDistance / 1000"
---
type: Tariff
name: long-distance
distance: 5000
rule: "0.5 * routeDistance / 1000"
```

```bash
apbr apply -f tariff.yaml
```

```javascript
const Tariff = resource("Tariff");
const TariffCalc = resource("TariffCalc");

TariffCalc.beforeCreate(tariffCalc => {
    const tariffs = Tariff.list({
        sorting: [{property: "distance"}]
    }).content

    tariffCalc.cost = 0;

    let remDistance = tariffCalc.distance;

    for (const tariff of tariffs) {
        const routeDistance = Math.min(tariff.distance, remDistance)
        remDistance -= routeDistance;

        tariffCalc.cost += eval(tariff.rule)
        tariffCalc.cost = Math.round(tariffCalc.cost * 100) / 100
    }

    return tariffCalc;
});
```

```bash
apbr deploy -f tariff-calc.js
```

It is ready to test

```bash
curl -X POST -H "Content-Type: application/json" -d '{"distance": 3500}' http://localhost:9009/tariff-calc

# {"distance":3500,"cost":6.3}
```

As you see, we define our resources and records in a declarative way. We define its behavior in a declarative way. We define its extensions in a nano-code way.

### The Purpose of ApiBrew

The purpose of ApiBrew is to move from Imperative programming to Declarative programming. It is to move from Low-Code to No-Code. It is to move from Code to Nano-Code.

As we tune our records and resources, you can achieve same result with less code or with no code.

### ApiBrew Internal Architecture and Design

![Tux, the Linux mascot](/files/apibrew-architecture-1.png)

Besides Main Components, ApiBrew has some other modules.

1. Nano Module
2. Testing Module (Coming Soon)
3. Code Generator

#### Interface Layer

ApiBrew has 3 external interfaces.

1. **Command Line Interface (CLI, apbr)** - [implementation](https://github.com/apibrew/apibrew/blob/master/pkg/apbr/main.go)
2. **REST API** - [implementation](https://github.com/apibrew/apibrew/blob/master/pkg/server/rest/server.go)
3. **GRPC API** - [implementation](https://github.com/apibrew/apibrew/blob/master/pkg/server/grpc/server.go), [proto](https://github.com/apibrew/apibrew/blob/master/proto/stub)

**CLI** and **Rest API** is connected to **"Api Interface"** Internal Interface. **GRPC API** is connected to **"GRPC Interface"** Internal Interface.

**"Api Interface"** is a common interface which works as a facade for internal services. [implementation](https://github.com/apibrew/apibrew/blob/master/pkg/api/abs.go)

So, we can assume that, CLI and RestApi is working almost same way as they are using same Internal facade.

**Note:** In many places, you will see unstructured.Unstructured type. It is a synonym for map\[string\]interface.

##### Api Interface Operations (deep dive)

```go
type Interface interface {
	Create(ctx context.Context, record unstructured.Unstructured) (unstructured.Unstructured, errors.ServiceError)
	Update(ctx context.Context, record unstructured.Unstructured) (unstructured.Unstructured, errors.ServiceError)
	Apply(ctx context.Context, record unstructured.Unstructured) (unstructured.Unstructured, errors.ServiceError)
	Load(ctx context.Context, record unstructured.Unstructured, params LoadParams) (unstructured.Unstructured, errors.ServiceError)
	Delete(ctx context.Context, record unstructured.Unstructured) errors.ServiceError
	List(ctx context.Context, params ListParams) (RecordListResult, errors.ServiceError)
}
```

A record can be golang map\[string\]interface representation of following yaml.

```yaml
type: resource
name: Tariff
properties:
  name:
    required: true
    unique: true
    type: string
  distance:
    required: true
    type: int32
  rule:
    required: true
    type: string
```

In record payload **type** is crucial. It is used to determine which resource it is.

If namespace is default, **type** will be **name of resource**. If namespace is not default, **type** will be **namespace + "/" + name of resource**.

`type: resource` - this is special type for Resource definition.

**Operations**:

1. **Create** - Create a record
2. **Update** - Update a record
3. **Apply** - Create or Update a record (It has special algorithm to locate record)
4. **Load** - Load a record
5. **Delete** - Delete a record
6. **List** - List records

**Note:** Although, There are not get operation, Load operation can be used to get a record. Rest API and CLI uses Load operation to get a record.

Create and Update are similar to each other. Apply is a combination of Create and Update. Apply is used to create or update a record. It has special algorithm to locate record.

Apply operation is searching for unique way to locate record.

Unique way can be an ID or a unique field. If there are not any unique way to locate request, it will give an error: [see implementation](https://github.com/apibrew/apibrew/blob/7df500f8c809dcefd873f073ef10db34f4763141/pkg/service/impl/record-service.go#L365C32-L365C58)

**Load** operation is used to load a record. It is used to get a record. Load operation is working in a similar way to Apply, it is locating algorithm with same algorithm. [see implementation](https://github.com/apibrew/apibrew/blob/7df500f8c809dcefd873f073ef10db34f4763141/pkg/service/impl/record-service.go#L314)

If multiple records are found or no records are found, it will give an error.

**List** operation is used to list records. It is used to get a list of records. [see list params](https://github.com/apibrew/apibrew/blob/7df500f8c809dcefd873f073ef10db34f4763141/pkg/api/abs.go#L28)

**Note:** List operation is not returning all records. It is returning a page of records.