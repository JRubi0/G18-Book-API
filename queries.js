const dotenv = require('dotenv'); 
dotenv.config({ path: './.env' });// Set path to .env file
// FIX ME need to create path to all files in features that contain query data

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})
// Access the environment variable using method process.env.VARIABLE_NAME
// located in node_modules. Installed when package.json was created.

// pulling in cart data
//const CREATE_NEW = require('./features/cart')

// creating a generic query to use with all features this one is for creating
const createNew = (request, response) => {
  pool.query(this.CREATE_NEW, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
} 

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