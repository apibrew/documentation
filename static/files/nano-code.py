Book = resource('Book')

@Book.before_create
def before_create(book):
    if book.description == None:
        book.description = 'No description'
