const express = require('express');       // pulling in express installed in .json
const bodyParser = require('body-parser') // pulling in body-parser from json
const app = express();                    // initialize app\
const pool = require('../pool.js');
//-------------------BOOK QUERIES----------------------

app.get('/books', getBooks) // gets all books
app.get('/books/:book_id', getBookById) // gets book by ID number
//app.post('/books', book.createBook)
//app.put('/books/:id', book.updateBook)
//app.delete('/books/:id', book.deleteBook)

//--------------------------------------------------------

const getBooks = (request, response) => {
  pool.query('SELECT * FROM book ORDER BY book_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
} 

const getBookById = (req, res) => 
{
  const book_id = parseInt(req.params.id)

  pool.query(`SELECT * from book where book_id=${req.params.book_id}`, (err, result) => 
  {
    if(!err)
    {
      res.json(result.rows[0]);
      res.status(200).json(result.rows)
    }
  });
  client.end;
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



//----------------------BOOK------------------------------

app.get('/books', getBooks) // gets all books
app.get('/books/:book_id', getBookById) // gets book by ID number
//app.post('/books', book.createBook)
//app.put('/books/:id', book.updateBook)
//app.delete('/books/:id', book.deleteBook)

//--------------------------------------------------------