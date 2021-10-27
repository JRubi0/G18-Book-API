

const getBooks = (request, response) => {
    pool.query('SELECT * FROM book ORDER BY book_id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}
  
const getBookById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM book WHERE book_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  /*
  const createBook = (request, response) => {
    const { name, email } = request.body
  
    pool.query('INSERT INTO book (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Book added with ID: ${result.insertId}`)
    })
}*/


  
module.exports = {
    getBooks,
    getBookById,
    //createBook,
    //updateBook,
    //deleteBook,
  }