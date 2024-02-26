// Loads resource from default namespace
const book = resource('Book')
const bookCover = resource('BookCover')

// execute command before creating record:
book.beforeCreate((record) => {
  record.name = 'Book 1'
});

// execute command after creating record:
book.afterCreate((record) => {
  console.log(record.id)
})

// execute command before updating record:
book.beforeUpdate((record) => {
  record.name = 'Book 2'
});

// execute command after updating record:
book.afterUpdate((record) => {
  console.log(record.id)
});

// you can also create/update/delete/get record by id:
book.afterCreate((record) => {
  book.update(record.id, {
    name: 'Book 2'
  })

  bookCover.create({
    name: 'Cover 1',
    description: 'Description 1',
  })
});
