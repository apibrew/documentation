package main

import "github.com/apibrew/apibrew/pkg/client"

...

repository := client.Repository[Book](BookMapperInstance)

// Or there are also different ways to get repo
repository := client.Repo[Book](BookMapperInstance)

// you can also setup generic record repository if you don't have model
resource, err := client.GetResourceByName("default", "Book")

if err != nil {
    log.Fatal(err)
}

repository := client.Repository[client.GenericRecord](client.GenericRecordMapper(resource))
