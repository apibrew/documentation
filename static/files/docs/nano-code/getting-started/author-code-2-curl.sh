curl -X POST http://localhost:8080/book \
-d '{"name": "Lord of the ", "author": {"name": "Tolkien"}}'

curl -X POST http://localhost:8080/book \
-d '{"name": "Tolkien", "author": {"name": "Tolkien"}}'

curl -X GET http://localhost:8080/author

### Result:
# [{"id":"a1f1be88-6e67-11ee-b962-0242ac120002","name":"Tolkien", "book_count": 3}]
