import io.apibrew.client.Client;
import io.apibrew.client.EntityInfo;
import io.apibrew.client.Repository;
import io.apibrew.client.model.Resource;

...

Repository<Book> repository = client.repository(Book.class);

Book book = new Book();
book.setName("Book 1");
book.setDescription("Description 1");

// Create new record.
Book createdBook = repository.create(book);

System.out.println(createdBook.getId()); // it will print id of created record.

// Update record.

// Update name
createdBook.setName("Book 2");
Book updatedBook = repository.update(createdBook);

// Delete record.
repository.delete(updatedBook.getId());

// Get record by id.
Book bookById = repository.get(createdBook.getId());

// Apply record.
Book bookToApply = new Book();
bookToApply.setName("Book 3");
bookToApply.setDescription("Description 3");

Book appliedBook = repository.apply(bookToApply);

// List records.
List<Book> books = repository.list();

// You can also use query to filter records.
List<Book> books = repository.list(ListRecordParams.builder()
                        .query(BooleanExpressionBuilder.eq("description", "Test Book"))
                        .resolveReferences("$.author") // it will preload author reference
                        .limit(2)
                        .offset(1)
                        .build());
// Load record.
Book loadedBook = repository.load(book);

// Watch record.
repository.watch((event) -> {
    System.out.println(event);
});
