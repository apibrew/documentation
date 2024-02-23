from apibrew.client import Repository, Client
from model.book import Book, BookResource

def run():
    client = Client.new_client()
    repository = client.repository(BookResource)

    book = Book()
    book.title = "test-title-123"

    repository.create(book)
