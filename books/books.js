const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

//----------------------BOOK------------------------------

const getBooks = (request, response) => {
  pool.query('SELECT * FROM book ORDER BY book_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
} 

const getBookById = (req, res) => {
  const id = parseInt(req.params.id)

  pool.query(`SELECT * from book where book_id=${req.params.book_id}`, (err, res) => {
    if (err) {
      throw err
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