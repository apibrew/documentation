import {Repository, Client} from "@apibrew/client";
import {Book, BookResource} from "./model/book.ts";

async function run() {
  const client: Client = Client.newClient();
  const repository: Repository<Book> = client.repository(BookResource);

  const book: Book = new Book();
  book.title = "test-title-123";

  await repository.create(book);
}
