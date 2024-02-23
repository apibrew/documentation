const Author = loadResource('Author')

Author.preprocess(item => {
  if (!item.description) {
    item.description = item.title + ' - updated-description'
  }
})
