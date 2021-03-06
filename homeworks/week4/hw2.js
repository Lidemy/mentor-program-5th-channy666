const request = require('request')

switch (process.argv[2]) {
  case 'list':
    listBooks()
    break
  case 'read':
    readBook(process.argv[3])
    break
  case 'delete':
    deleteBook(process.argv[3])
    break
  case 'create':
    createBook(process.argv[3])
    break
  case 'update':
    updateBook(process.argv[3], process.argv[4])
    break
  default:
    console.log('Avalible commands: list, read, delete, create, update, please try again!')
}

function listBooks() {
  request('https://lidemy-book-store.herokuapp.com/books?_limit=20', (error, response, body) => {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      if (error) {
        console.log('error:', error)
        return
      }

      let books
      try {
        books = JSON.parse(body)
      } catch (error) {
        console.log('error:', error)
        return
      }

      for (let i = 0; i < books.length; i++) {
        console.log(books[i].id, books[i].name)
        return
      }
    }
    console.log(`error: HTTP ${response.statusCode}`)
  })
}

function readBook(id) {
  request(`https://lidemy-book-store.herokuapp.com/books/${id}`, (error, response, body) => {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      if (error) {
        console.log('error:', error)
        return
      }

      if (body === '{}') {
        console.log(`找不到 id 為 ${id} 的書`)
        return
      }

      let book
      try {
        book = JSON.parse(body)
      } catch (error) {
        console.log('error:', error)
        return
      }

      console.log(book.name)
      return
    }
    console.log(`error: HTTP ${response.statusCode}`)
  })
}

function deleteBook(id) {
  request.del(`https://lidemy-book-store.herokuapp.com/books/${id}`, (error, response, body) => {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      if (error) {
        console.log('error:', error)
        return
      }
      console.log(`已成功刪除 id ${id}`)
      return
    }
    console.log(`error: HTTP ${response.statusCode}`)
  })
}

function createBook(bookName) {
  request.post(
    {
      url: 'https://lidemy-book-store.herokuapp.com/books',
      form:
      {
        id: '',
        name: bookName
      }
    },
    (error, response, body) => {
      if (response.statusCode >= 200 && response.statusCode < 300) {
        if (error) {
          console.log('error:', error)
          return
        }

        let book
        try {
          book = JSON.parse(body)
        } catch (error) {
          console.log('error:', error)
          return
        }
        console.log(book)
        return
      }
      console.log(`error: HTTP ${response.statusCode}`)
    }
  )
}

function updateBook(id, newBookName) {
  request.patch(
    {
      url: `https://lidemy-book-store.herokuapp.com/books/${id}`,
      form:
      {
        name: newBookName
      }
    },
    (error, response, body) => {
      if (response.statusCode >= 200 && response.statusCode < 300) {
        if (error) {
          console.log('error:', error)
          return
        }

        if (body === '{}') {
          console.log(`找不到 id 為 ${id} 的書`)
          return
        }

        let book
        try {
          book = JSON.parse(body)
        } catch (error) {
          console.log('error:', error)
          return
        }
        console.log(book)
        return
      }
      console.log(`error: HTTP ${response.statusCode}`)
    }
  )
}
