const Author = loadResource('Author')
const Book = loadResource('Book')

Book.postprocess(item => {
  const author = Author.load(item.author);
  const authorBooks = Book.find({
    filters: {author: author}
  })
  author.book_count = authorBooks.length;
  Author.save(author);
})
