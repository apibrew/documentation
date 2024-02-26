package main

import "github.com/apibrew/apibrew/pkg/client"

...

handler := extensionService.Handler[Book](BookMapperInstance)

// operate on event
handler.When(beforeCreate()).Operate(func(e Event, book *Book) {
  fmt.Printf("Before create: %+v\n", book)
})

// multiple conditions (AND)
// Note: The Go code has one 'after' condition.
handler.When(after()).Operate(func(e Event, book *Book) {
  fmt.Printf("After create: %+v\n", book)
})

// you can also cancel handler when needed
operatorId := handler.When(after()).Operate(func(e Event, book *Book) {
  fmt.Printf("After create: %+v\n", book)
})

// cancel handler
// Assuming a function like 'unRegisterOperator' exists in your Go code:
extensionService.unRegisterOperator(operatorId)
