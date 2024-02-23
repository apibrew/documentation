const book = resource('Book')

// you can also create/update/delete/get record by id:
book.beforeCreate((book) => {
  if (!book.description) {
    book.description = 'No description'
  }
});
