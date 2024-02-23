import {Repository, Client} from "@apibrew/client";
import {Book, BookResource} from "./model/book.ts";

async function run() {
  const client = Client.newClient();
  const repository = client.repository(BookResource);

  const book = new Book();
  book.title = "test-title-123";

  await repository.create(book);
}
