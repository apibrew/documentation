# CLI
## Overview

The **apbr** command line interface (CLI) is a tool that helps you work with Api Brew instances.

With help of **apbr** you can:

1. Configure your apbr profile
2. Get / Create / Update / Apply / Delete **Resources**
3. Get / Create / Update / Apply / Delete **Records** (for any resource, including system resources like user, namespace, etc.)
4. Generate code of models (for golang, javascript, typescript, java)
5. Deploy nano code
6. Backup / Export (use get command)
7. Restore / Import (use apply or create command)

---

## Configure

We are assuming you already have an **api-brew instance** running. If you don't have one, you can register in [our cloud](https://apibrew.io/docs/docs/cloud/getting-started) and get a free instance or you can install it [locally](https://apibrew.io/docs/on-prem/getting-started).

Now you need to configure _apbr_ to connect to your **api-brew instance**.

There are two ways to configure _apbr_:

#### Interactive configuration

You can configure _apbr_

```bash
apbr configure
Address: (your-project.api-brew.io:9443)
Username: (your username)
Password: (your password)
Insecure[false]: (false)
```

#### Manually configuring by config file

You can create a config file and put it to **~/.apbr/config.yaml**  
How config files looks like:

```yaml
type: server
servers:
  - name: (your-project-name)
    host: (your-project.api-brew.io:9443)
    insecure: false
    authentication:
      username: (your username)
      password: (your password)
defaultServer: (your-project-name)
```

Example of filled one:

```yaml
type: server
servers:
  - name: project-77fbc4
    host: project-77fbc4.api-brew.io:9443
    insecure: false
    authentication:
      username: admin
      password: admin
defaultServer: project-77fbc4
```

#### Multiple profiles

You can have multiple profiles in your config file.  
They are distinguished by **name** field.  
And you can switch between them by **defaultServer** field. Or while running commands you can specify **\--apbr-server** flag.

---

## Command: Get

**Get** command is used to get a resource or records from your **api-brew instance**.

Example:

```bash
apbr get book
```

### Arguments

- **resource / namespace** (required) - name of resource / namespace to get data  
  If resource(s) or type(s) is provided, it will return resources instead of records.


If only one argument is provided, it will be treated as resource.  
If two arguments are provided, first one will be treated as namespace and second one will be treated as resource.  
Additionally, you can provide namespace and resource pair with slash in single argument.

**Note:** If you want to get all records of a resource, you can use **all**

If you want to get resource named book:  
apbr get resource --filter name=book

### Parameters

- **\--format** (optional; default: console) - Format of file. It can be console, yaml or json. For  
  **If format is console or empty** it will print data to console in a table format.
- **\-o** or **\--output** (optional; default: stdout) - Output file path. If not set, it will print to stdout.
- **\--limit** (optional; default: 100) - Limit of records to get. If not set, it will get all records.
- **\--offset** (optional; default: 0) - Offset of records to get. If not set, it will get from beginning.
- **\--filter** (optional) - List of filters to apply. If not set, it will get all  
  Example:  
  \--filters name=Taleh,age=30  
  \--filters name=Taleh --filters age=30  
  \--filters name='Taleh Ibrahimli' --filters age=30  
  \--filters publishData.publisher=Company1
- **\--for-apply** (optional; default: false) - If set true, it will return data in a format that can be easily applied. It will skip default and null values. And also if there are identifiable properties, it will skip id.
- **\-a** or **\--append** (optional; default: false) - If set true, it will append data to output file. If not set, it will override output file.  
  _It is only applicable if output file is set._  
  _It is only applicable if format is yaml formats_
- **\--pack-records** (optional; default: false) - If set true, it will pack records to reduce file size.  
  Properties of records will be sent inside packedProperties property and in an array format

### Examples

```bash
apbr get book --filter name=Taleh
apbr get book --filter name=Taleh --filter age=30
apbr get book --filter name=Taleh --filter age=30 --filter publishData.publisher=Company1
apbr get book --for-apply
apbr get book --filter name=Taleh --format=json
apbr get book --filter name=Taleh --format=json --output=book.json
apbr get book --filter name=Taleh --format=yaml --limit=1000 --offset=100

apbr get book # it will return all books (all records of book resource)
apbr get default book # it will return all books (all records of book resource)
apbr get default/book # it will return all books (all records of book resource)

apbr get resources --filter name=book # it will return book resource itself

apbr get all # it will return all records of all resources
```

---

## Command: Apply

**Apply** command is used to apply a resource or records to your **api-brew instance**.  
It is similar to **kubectl apply** command.  
**apbr apply** command will create/update resources and records. If a resource or record already exists, it will be updated. If it does not exist, it will be created.

Example:

```bash
apbr apply -f book.yml
```

### Parameters

- **\-f** or **\--file** (required) - path to file or directory  
  more information about formats, see [file input](https://apibrew.io/docs/cli#file-input) paragraph.
- **\-n** or **\--namespace** (optional; default: default) - resource/record namespace, if namespace is already set in applied file, it will be overridden
- **\-m** or **\--migrate** (optional; default: true) - This flag only affects resources. By default it is true, if set to false, resource operation will not be applied to database. It is only allowed on on-prem instances. It is useful when you are applying changes to database manually.
- **\--force** (optional; default: false) - This flag only affects resources. Normally, when resource is updated, ApiBrew is compares existing resource config and updated and prepares migration plan. After it applies migration. But, if force is enabled, It will compare it directly from database and will try to forcefully apply changes. Besides that, normally when you remove property it is not deleted from database, it is just marked as deleted. But if force is enabled, it will delete it from database.
- **\--data-only** (optional; default: false) - If set true, only records will be applied.
- **\--schema-only** (optional; default: false) - If set true, only resources will be applied.
- **\--format** (optional; default: yaml) - Format of file. It can be yaml, json or pbe. For  
  By default, apbr tries to identify format from file extension. format flag is useful when non-standard file extensions are used.

### How it works?

When you apply a file, it is converted to a dynamic structure (UnStructured). Then, if any preprocess is present, this preprocessors are applied.  
more information about preprocessors, see [preprocessors](https://apibrew.io/docs/cli#preprocessors) paragraph.  
Then, Record **must be identifiable**, so if it is not identifiable, it will produce an error.  
**Resource can be identifiable** either its id or its name and namespace is set.

**Records can be identified** by any of followings.

1. id is provided
2. unique property is provided
3. if unique index exists, all properties of a unique index is provided

(by provided, it means that it exists and it is different than default value and null)  
If resource/record is not identifiable, it will produce an error.  
After identification, it will be compared with existing resource/record.  
**If resource/record is already exists** -  
If it is different, it will be updated.  
If it is same, it will be skipped.  
**If resource/record not found** -  
It will be created.

### Examples

```bash
apbr apply -f book.yml
apbr apply -f book.yml --migrate=false # it will not apply migration to database
apbr apply -f book.yml --force # it will forcefully apply changes to database
apbr apply -f book.yml --data-only # it will only apply records
apbr apply -f book.yml --schema-only # it will only apply resource
apbr apply -f book.data --format=json # it will apply file in json format
```

---

## Command: Create

**Create** command is used to create a resource or records to your **api-brew instance**.  
It is similar to **kubectl create** command.  
**apbr create** command will create resources and records. If a resource or record already exists, it will raise an error.

Create command is similar to apply command. But it **will not update existing** resources or records, instead it will raise an error. Also, it **will not check if resource is identifiable** or not. It will just create it.

Example:

```bash
apbr create -f book.yml
```

### Parameters

- **\-f** or **\--file** (required) - path to file or directory  
  more information about formats, see [file input](https://apibrew.io/docs/cli#file-input) paragraph.
- **\-n** or **\--namespace** (optional; default: default) - resource/record namespace, if namespace is already set in applied file, it will be overridden
- **\-m** or **\--migrate** (optional; default: true) - This flag only affects resources. By default it is true, if set to false, resource operation will not be applied to database. It is only allowed on on-prem instances. It is useful when you are applying changes to database manually.
- **\--force** (optional; default: false) - This flag only affects resources. Normally, when resource is updated, ApiBrew is compares existing resource config and updated and prepares migration plan. After it applies migration. But, if force is enabled, It will compare it directly from database and will try to forcefully apply changes. Besides that, normally when you remove property it is not deleted from database, it is just marked as deleted. But if force is enabled, it will delete it from database.
- **\--data-only** (optional; default: false) - If set true, only records will be applied.
- **\--schema-only** (optional; default: false) - If set true, only resources will be applied.
- **\--format** (optional; default: yaml) - Format of file. It can be yaml, json or pbe. For  
  By default, apbr tries to identify format from file extension. format flag is useful when non-standard file extensions are used.

### How it works?

When you apply a file, it is converted to a dynamic structure (UnStructured). Then, if any preprocess is present, this preprocessors are applied.  
more information about preprocessors, see [preprocessors](https://apibrew.io/docs/cli#preprocessors) paragraph.

### Examples

```bash
apbr create -f book.yml
apbr create -f book.yml --migrate=false # it will not apply migration to database
apbr create -f book.yml --force # it will forcefully apply changes to database
apbr create -f book.yml --data-only # it will only apply records
apbr create -f book.yml --schema-only # it will only apply resource
apbr create -f book.data --format=json # it will apply file in json format
```

---

## Command: Update

**Update** command is used to update a resource or records to your **api-brew instance**.  
It is similar to **kubectl update** command.  
**apbr update** command will update resources and records. If a resource or record not exists, it will raise an error.

Create command is similar to apply command. But it **will not create non-existing** resources or records, instead it will raise an error. Also, it **will not check if resource is identifiable** or not. It will just try to update it.

Example:

```bash
apbr create -f book.yml
```

### Parameters

- **\-f** or **\--file** (required) - path to file or directory  
  more information about formats, see [file input](https://apibrew.io/docs/cli#file-input) paragraph.
- **\-n** or **\--namespace** (optional; default: default) - resource/record namespace, if namespace is already set in applied file, it will be overridden
- **\-m** or **\--migrate** (optional; default: true) - This flag only affects resources. By default it is true, if set to false, resource operation will not be applied to database. It is only allowed on on-prem instances. It is useful when you are applying changes to database manually.
- **\--force** (optional; default: false) - This flag only affects resources. Normally, when resource is updated, ApiBrew is compares existing resource config and updated and prepares migration plan. After it applies migration. But, if force is enabled, It will compare it directly from database and will try to forcefully apply changes. Besides that, normally when you remove property it is not deleted from database, it is just marked as deleted. But if force is enabled, it will delete it from database.
- **\--data-only** (optional; default: false) - If set true, only records will be applied.
- **\--schema-only** (optional; default: false) - If set true, only resources will be applied.
- **\--format** (optional; default: yaml) - Format of file. It can be yaml, json or pbe. For  
  By default, apbr tries to identify format from file extension. format flag is useful when non-standard file extensions are used.

### How it works?

When you apply a file, it is converted to a dynamic structure (UnStructured). Then, if any preprocess is present, this preprocessors are applied.  
more information about preprocessors, see [preprocessors](https://apibrew.io/docs/cli#preprocessors) paragraph.

### Examples

```bash
apbr update -f book.yml
apbr update -f book.yml --migrate=false # it will not apply migration to database
apbr update -f book.yml --force # it will forcefully apply changes to database
apbr update -f book.yml --data-only # it will only apply records
apbr update -f book.yml --schema-only # it will only apply resource
apbr update -f book.data --format=json # it will apply file in json format
```

---

## Command: Delete

**Delete** command is used to delete a resource or records to your **api-brew instance**.  
It is similar to **kubectl delete** command.  
**apbr delete** command will delete resources and records.

Example:

```bash
apbr delete book --filter name=Taleh
```

### Arguments

- **resource** (required) - name of resource to get data  
  If resource(s) or type(s) is provided as an argument, it will delete resources instead of records.

If only one argument is provided, it will be treated as resource.  
If two arguments are provided, first one will be treated as namespace and second one will be treated as resource.  
Additionally, you can provide namespace and resource pair with slash in single argument.

Examples:  
apbr delete book  
apbr delete default book  
apbr delete default/book

**Note:** If you want to delete all records of a resource, you can use **all**

If you want to delete resource named book:  
apbr delete resource --filter name=book

### Parameters

- **\--filter** (optional) - List of filters to apply. If not set, it will get all  
  Example:  
  \--filters name=Taleh,age=30  
  \--filters name=Taleh --filters age=30  
  \--filters name='Taleh Ibrahimli' --filters age=30  
  Nested filters:  
  \--filters publishData.publisher=Company1
- **\-f** or **\--file** (optional) - path to file or directory, if provided, it will try to identify records/resource from input file and delete them.  
  _You cannot use both filter and file at the same time._  
  more information about formats, see [file input](https://apibrew.io/docs/cli#file-input) paragraph.

### How it works?

When you apply a file, it is converted to a dynamic structure (UnStructured). Then, if any preprocess is present, this preprocessors are applied.  
more information about preprocessors, see [preprocessors](https://apibrew.io/docs/cli#preprocessors) paragraph.

### Examples

```bash
apbr delete book --filter name=Taleh
apbr delete book --filter name=Taleh --filter age=30
apbr delete book --filter name=Taleh --filter age=30 --filter publishData.publisher=Company1
apbr delete book --file book.yml # book.yml must contain identifiable records
```

---

## Command: Generate

**Generate** command is used to generate code of models.

### Parameters

- **\-p** or **\--path** (required) - path to directory where code will be generated
- **\--platform** (required) - platform of generated code. It can be golang, javascript, typescript, java
- **\--package** (optional) - package name of generated code (its usage will depend on the platform)
- **\--filter** (optional) - List of filters to apply. If not set, it will get all  
  Example:  
  \--filters name=Book

- **\-n** or **\--namespace** (optional; default: default) - if provided, resources will be filtered by namespace

### How it works?

For each language platform we have code generator. It will generate code of models.

### Examples

```bash
apbr generate -p ./generated -platform golang
apbr generate -p ./generated -platform javascript
apbr generate -p ./generated -platform typescript
apbr generate -p ./generated -platform java
apbr generate -p ./generated -platform golang --package models
apbr generate -p ./generated -platform javascript --package models
```

---

## Command: Deploy

**Deploy** command is used to deploy nano code.

### Parameters

- **\-f** or **\--file** (required) - path to file or directory  
  more information about formats, see [file input](https://apibrew.io/docs/cli#file-input) paragraph.
- **\--name** (optional) - name of nano code. If not provided, it will be generated from file name.
- **\--override** (optional) - if set true, it will override existing nano code. Otherwise, it will raise an error if nano code already exists.

### How it works?

When you deploy a nano code file, it will create new record of nano code resource. (nano/Code)

There are two types of nano code:

---

## File Input

File inputs are part of several commands (apply, create, update)

File inputs can be a single file or multiple files

```bash
apbr apply -f book.yml
apbr apply -f book.yml -f author.yml
apbr apply -f book.yml,author.yml
```

You can also provide directory as input. In this case, all files in directory will be used as input.

```bash
apbr apply -f files
```

It will apply all files inside files directory and inside all subdirectories of files

You can also provide files with glob pattern.  
Like:

```bash
apbr apply -f files/**/*.yml
```

---

## Pre Processorss

Preprocessors are part of several commands (apply, create, update)

With help of preprocessors, you can modify data before applying it to your instance.

### Available preprocessors

#### $file

If provided, it will include file content to data.

```yaml
type: Book
name: book1
description:
  $file: description.txt
```

So, description field will be populated from description.txt

#### $folder

If provided, it will include folder content to data in a tar + base64 format.

```yaml
type: Book
name: book1
description:
  $folder: description/files
```

So, description field will be populated from tar + base64 encoded description/files folder