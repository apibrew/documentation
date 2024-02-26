from apibrew import Client, Repository, GenericRecord, BooleanExpressionBuilder

...

repository = client.repository(Book)

book = Book()
book.name = "Book 1"

# Create new record.
created_book = repository.create(book)

print(created_book.id) # it will print id of created record.

# Update record.

# Update name
created_book.name = "Book 2"
updated_book = repository.update(created_book)

# Delete record.
repository.delete(updated_book.id)

# Get record by id.
book_by_id = repository.get(created_book.id)

# Apply record.
book_to_apply = Book()
book_to_apply.name = "Book 3"

applied_book = repository.apply(book_to_apply)

# List records.
books = repository.list()

# You can also use query to filter records.
books = repository.list({
  'query': BooleanExpressionBuilder.eq('description', 'Test Book'),
  resolveReferences: ["$.author"], // it will preload author reference
  'limit': 2,
  'offset': 1
})

# Load record.
loaded_book = repository.load(book)

# Watch record.

def watchBook(event):
    print(event)

repository.watch(watchBook)
