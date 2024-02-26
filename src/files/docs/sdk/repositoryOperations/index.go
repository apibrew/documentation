package main

import "github.com/apibrew/apibrew/pkg/client"

...

repository := client.Repository[Book](BookMapperInstance)

book := &Book{
    Name: "Book 1",
}

// Create new record.
createdBook, err := repository.Create(book)

if err != nil {
    log.Fatal(err)
}

fmt.Println(createdBook.Id) // it will print id of created record.

// Update record.

// Update name
createdBook.Name = "Book 2"
updatedBook, err := repository.Update(createdBook)

if err != nil {
    log.Fatal(err)
}

// Delete record.
err = repository.Delete(updatedBook.Id)

if err != nil {
    log.Fatal(err)
}

// Get record by id.
bookById, err := repository.Get(createdBook.Id)

if err != nil {
    log.Fatal(err)
}

// Apply record.

bookToApply := &Book{
    Name: "Book 3",
}

appliedBook, err := repository.Apply(bookToApply)

if err != nil {
    log.Fatal(err)
}

// List records.
books, err := repository.List()

if err != nil {
    log.Fatal(err)
}

// You can also use query to filter records.
books, err := repository.List(&ListRecordParams{
    Query: client.BooleanExpressionBuilder.Eq("description", "Test Book"),
    resolveReferences: ["$.author"], // it will preload author reference
    Limit: 2,
    Offset: 1,
})

if err != nil {
    log.Fatal(err)
}

// Load record.
loadedBook, err := repository.Load(book)

if err != nil {
    log.Fatal(err)
}

// Watch record.
repository.Watch(func(event *client.RecordEvent) {
    fmt.Println(event)
})
