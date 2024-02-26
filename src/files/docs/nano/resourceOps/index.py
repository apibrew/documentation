# Loads resource from default namespace
book = resource('Book')
book_cover = resource('BookCover')

# execute command before creating record:
book.before_create(lambda: print("before create"))

# execute command after creating record:
book.after_create(lambda: print("after create"))

# execute command before updating record:
book.before_update(lambda: print("before update"))

# execute command after updating record:
book.after_update(lambda: print("after update"))

# you can also create/update/delete/get record by id:
@book.after_create
def create_book(record):
    book.update(record.id, {
        'name': 'Book 2',
    })

    book_cover.create({
        'name': 'Cover 1',
        'description': 'Description 1',
    })
