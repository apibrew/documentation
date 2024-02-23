package io.company;

import io.apibrew.client.Client;
import io.apibrew.client.Repository;
import io.apibrew.company.model.Book;

import java.io.IOException;

public class BookService {

    public static void main(String[] args) throws IOException {
        Client client = Client.newClient();

        Repository<Book> repository = client.repository(Book.class);

        Book book = new Book();
        book.setTitle("test-title-123");

        repository.create(book);
    }
}
