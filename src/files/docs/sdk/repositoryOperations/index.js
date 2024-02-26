import {Client, Repository, GenericRecord} from '@apibrew/client';

// ... //

const repository = client.repository(BookEntityInfo);

const book = {
  name: 'Book 1',
  description: 'Description 1'
}

// Create new record.
const createdBook = await repository.create(book);

console.log(createdBook.id); // it will print id of created record.

// Update record.

// Update name
createdBook.name = 'Book 2';
const updatedBook = await repository.update(createdBook);

// Delete record.
await repository.delete(updatedBook.id);

// Get record by id.
const bookById = await repository.get(createdBook.id);

// Apply record.
const bookToApply = {
  name: 'Book 3',
  description: 'Description 3'
}

const appliedBook = await repository.apply(bookToApply);

// List records.
const books = await repository.list();

// You can also use query to filter records.
const books = await repository.list({
  query: BooleanExpressionBuilder.eq('description', 'Test Book'),
  resolveReferences: ["$.author"], // it will preload author reference
  limit: 2,
  offset: 1
});

// Load record.
const loadedBook = await repository.load(book);

// Watch record.
repository.watch((event) => {
  console.log(event);
});
