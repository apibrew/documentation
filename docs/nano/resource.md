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

Method template: before|after + Create|Update|Delete|Get|List

Syntax:
```js
/**
 * @param {function} fn
 * @returns {void}
 * 
 * @callback fn
 * @param {object} record (record is a resource record)
 * @param {object} event (event is a resource action event)
 * @returns {object} (return is optional, if you return a value, it will be used as a updated record)
 */
<Resource>.<action>(<function>);
```

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

Book.afterCreate((book, event) => {
    // event
    console.log(event);
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

#### create
```js
/**
 * @param {object} record
 * @returns {object}
 */
<Resource>.create(<object>);

// example
const book = Book.create({
    name: 'book',
    description: 'book description'
});
```

#### update
```js
/**
 * @param {object} record
 * @returns {object}
 */
<Resource>.update(<object>);
    
// example
const book = Book.update({
    id: 'my-book-id',
    name: 'book',
    description: 'book description'
});
```

#### apply
```js
/**
 * @param {object} record
 * @returns {object}
 */

<Resource>.apply(<object>);
    
// example
const book = Book.apply({
    id: 'my-book-id', // optional, if not provided, unique property will be used to locate record
    name: 'book',
    description: 'book description'
});
```

#### delete
```js
/**
 * @param {object} record
 * @returns {object}
 */
<Resource>.delete(<object>);
    
// example
const book = Book.delete({
    id: 'my-book-id'
});
```

#### get
```js
/**
 * @param {string} id
 * @returns {object}
 */

<Resource>.get(<string>);
    
// example
const book = Book.get('my-book-id');
```

#### findById
```js
/**
 * @param {string} id
 * @returns {object}
 */

<Resource>.findById(<string>);
    
// example
const book = Book.findById('my-book-id');
```

#### list
```js
/**
 * @param {object} params (optional)
 * @returns {content: object[], total: number} (content is a list of records, total is a total number of records)
 * @param {[key: string]: string} params.filters (optional)
 * @param {number} params.limit (optional)
 * @param {number} params.offset (optional)
 * @param {string[]} params.resolveReferences (optional)
 * @param {{property: string, direction: string}[]} params.sorting (optional)
 * @param {items: {name: string, algorithm: "SUM" | "COUNT" | "MIN" | "MAX" | "AVG", property: string}[], grouping: {property: string}[]} params.aggregation (optional)
 * @param {see BooleanExpression on https://docs.apibrew.io/fundamentals/schema} params.query (optional)
 */

<Resource>.list(<object>, <params>);
    
// example
const books = Book.list({
    filter: {
        name: 'book'
    },
    limit: 1000,
    offset: 0,
});
const books2 = Book.list({
    query: {
        equal: {
            left: {
                property: 'name'
            },
            right: {
                value: 'book'
            }
        }
    },
    sorting: [
        {
            property: 'name',
            direction: 'ASC'
        }
    ],    
    limit: 1000,
    offset: 0,
});
```

#### load
```js
/**
 * @param {object} record
 * @returns {object}
 */

<Resource>.load(<object>);
    
// example
const book = Book.load({
    id: 'my-book-id'
});

// load also can be used to load referenced records

Book.beforeCreate(book1 => {
    const existing = Book.load(book1); // reload book1
    
    const author = Author.load(book1.author); // load author referenced by book1
});

```

#### count
```js
/**
 * @param {[key: string]: string} filters (optional)
 * @returns {number}
 */

<Resource>.count(<filters>);
    
// example
const count = Book.count({
    name: 'book'
});
```

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

#### Resource modifier functions

With help of resource modifier functions, you can modify resource properties. This modification will not be stored in database, it will be only visible changes.

The purpose of this function is to calculate dynamic properties, or to load referenced records.

Example:
```js
const Person = resource('Person');
const Education = resource('Education');

Person.modifier(person => {
    person.educations = Education.list({
        filters: {
            person: person.id
        }
    }).content;
})
```
