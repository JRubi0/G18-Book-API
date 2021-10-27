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
  pool.query(`SELECT * FROM book`, (err, result) => 
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

  pool.query(`SELECT( * FROM book WHERE book_id=${req.params.book_id}) UNION ALL SELECT author_name FROM author WHERE author_id = (SELECT author_id FROM book_author WHERE book_id = $book_id LIMIT 1) ORDER BY author_id ASC`, (err, result) => 
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
  pool.query(`SELECT * FROM book WHERE isbn13='${req.params.isbn13}'`, (err, result) => 
  {
    if(!err)
    {
      res.status(200).json(result.rows[0]);
    }
  });
  pool.end;
}



const createBook = (request, response) => {
  const { name, email } = request.body

  pool.query('INSERT INTO book (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Book added with ID: ${result.insertId}`)
  })
}



module.exports = {
  getBooks,
  getBookById,
  getBookByISBN,
  //createBook,
  //updateBook,
  //deleteBook,
} 