---
sidebar_position: 3
---

# Resource

To operate on a resource, you need to load it first. To load a resource, you need to use resource function

```js
// option 1, load resource from default namespace
const Book = resource('Book');

// option 2, load resource from given namespace
const Book = resource('default', 'Book');

// option 3, load resource from given namespace by indicating it inside name
const Book = resource('default/Book');
```

Resource object has set of operations

#### Handler methods

- beforeCreate
- beforeUpdate
- beforeDelete
- beforeGet
- beforeList
- afterCreate
- afterUpdate
- afterDelete
- afterGet
- afterList

Each handler method accepts only one parameter, which is a function. And this function is executed when given action is executed in given time

**Example:**

```js
// option 1, load resource from default namespace
const Book = resource('Book');

Book.beforeUpdate(book => {
    book.description = book.description + ' updated';

    // return is optional, if you return a value, it will be used as a new value
    return book;
});

// all handler methods have same signature
```

#### Bind methods

- bindCreate
- bindUpdate
- bindDelete
- bindGet
- bindList

Bind methods are used to bind one resource action to another.

**Example:**  
It is like facade for resource actions.  
Let's say, you have a Book and Book1 resources, you want to create Book when Book1 is created.

```js
// option 1, load resource from default namespace
const Book = resource('Book');
const Book1 = resource('Book1');

const book1FromBook = book => {
    return {
      name: book.name,
      notes: book.description
    }
}

const book1ToBook = book1 => {
    return {
      name: book1.name,
      description: book1.notes
    }
}

// you need a to indicate bound resource and mapper functions
Book1.bindCreate(Book, book1FromBook, book1ToBook);
Book1.bindList(Book, book1FromBook, book1ToBook);

// all bind functions have same signature
```

#### Repository methods

- create
- update
- apply
- delete
- get
- findById
- list
- load
- count

Repository methods are used to operate on a record.

**Examples:**

```js
// option 1, load resource from default namespace
const Book = resource('Book');
const Book1 = resource('Book1');

Book1.afterCreate(book1 => {
  // create a book
  const book = Book.create({
    name: book1.name,
    description: book1.notes
  });

  // update a book
  Book.update(book);

  // apply a book
  Book.apply(book);

  // delete a book
  Book.delete(book);

  // get a book
  const book = Book.get('my-book-id');

  // find a book by id
  const book = Book.findById('my-book-id');

  // list books
  const books = Book.list();

  // list books method has an optional parameter params
  const books = Book.list({
    filter: {
      name: 'book'
    },
    limit: 1000,
    offset: 0,
  });

  // load a book, load action is used to reload a record from apibrew server,
  // it is useful when you want to load some referenced record to get other properties of it
  const book = Book.load(book);
});
```
