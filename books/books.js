const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

//-------------------BOOK QUERIES----------------------
const getBooks = (req, res) => 
{
  pool.query(`SELECT * FROM book ORDER BY book_id ASC`, (err, result) => 
  {
    if(!err)
    {
    res.status(200).json(result.rows);
    }
  });
  pool.end;
}

const getBookById = (req, res) => 
{
  pool.query(`SELECT book.*, author.author_name, author.author_id
              FROM book, author
              WHERE book_id= ${req.params.book_id} AND author_id = (SELECT author_id FROM book_author WHERE book_id = ${req.params.book_id} LIMIT 1) 
              ORDER BY author_id ASC`, (err, result) => 
  {
    if(!err)
    {
      res.status(200).json(result.rows[0]);
    }
  });
  pool.end;
}

const getBookByISBN = (req, res) => 
{
  pool.query(`SELECT * FROM book WHERE isbn13='${req.params.isbn13}'`, (err, result) => 
  {
    if(!err)
    {
      res.status(200).json(result.rows[0]);
    }
  });
  pool.end;
}

const getAuthorsBooks = (req, res) => 
{ 
  
  pool.query(`SELECT author.author_name, book_id, title, isbn13
  FROM author, book
  WHERE book_id = (SELECT book_id FROM book WHERE book_id = (SELECT book_id FROM book_author WHERE author_id='${req.params.author_id}')) AND author_id='${req.params.author_id}'`, (err, result) => 
  {
    if(!err)
    {
      res.status(200).json(result.rows[0]);
    }
  });
  pool.end;
}

const createBook = (req, res) => {
  const { book_id, title, isbn } = req.body

  pool.query(`INSERT INTO book (book_id, title, isbn13) VALUES ('${req.params.book_id}','${req.params.title}','${req.params.isbn13}')`, (err, result) => 
  {
    if(!err)
    {
      res.status(201).send(`Book added with ID: ${result.insertId}`);
    }
  });
  pool.end;
}


module.exports = {
  getBooks,
  getBookById,
  getBookByISBN,
  getAuthorsBooks,
  createBook,
  //updateBook,
  //deleteBook,
} 