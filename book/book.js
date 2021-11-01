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
  pool.query(`SELECT book.*, author.author_name, author.author_id, publisher.publisher_name
              FROM book, author, publisher
              WHERE book_id = ${req.params.book_id} 
                  AND author_id = (SELECT author_id FROM book_author WHERE book_id = ${req.params.book_id} LIMIT 1) 
                  AND publisher.publisher_id = (SELECT publisher_id FROM publisher WHERE publisher_id = (SELECT publisher_id FROM book WHERE book_id = ${req.params.book_id}))
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
  pool.query(`SELECT book.*, author.author_name, author.author_id, publisher.publisher_name
              FROM book, author, publisher
              WHERE book_id = (SELECT book_id FROM book WHERE isbn13= '${req.params.isbn13}') 
                  AND author_id = (SELECT author_id FROM book_author WHERE book_id = (SELECT book_id FROM book WHERE isbn13= '${req.params.isbn13}') LIMIT 1) 
                  AND publisher.publisher_id = (SELECT publisher_id FROM publisher WHERE publisher_id = (SELECT publisher_id FROM book WHERE isbn13= '${req.params.isbn13}'))`, (err, result) => 
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
              WHERE book_id IN (SELECT book_id FROM book WHERE book_id IN (SELECT book_id FROM book_author WHERE author_id='${req.params.author_id}')) AND author_id='${req.params.author_id}'`, (err, result) => 
  {
    if(!err)
    {
      res.status(200).json(result.rows);
    }
  });
  pool.end;
}

const createBook = (req, res) => //Add identities
{
  pool.query(`BEGIN;
              INSERT INTO publisher (publisher_name) VALUES ('${decodeURIComponent(req.params.publisher)}');
              INSERT INTO author (author_name) VALUES ('${decodeURIComponent(req.params.author)}');
              INSERT INTO book (publisher_id, title, isbn13, descr, genre, copies_sold, publication_date) VALUES ((currval(pg_get_serial_sequence('publisher','publisher_id'))), '${decodeURIComponent(req.params.title)}', '${decodeURIComponent(req.params.isbn)}', '${decodeURIComponent(req.params.desc)}', '${decodeURIComponent(req.params.genre)}', '${decodeURIComponent(req.params.copiessold)}', '${decodeURIComponent(req.params.publishdateymd)}');
              INSERT INTO book_author (book_id, author_id) VALUES ((currval(pg_get_serial_sequence('book','book_id'))), (currval(pg_get_serial_sequence('author','author_id')))) RETURNING book_id AS resultid;
              COMMIT;
              `, (err, result) => 
  {
    if(!err)
    { 
      res.status(201).send(`Book added with ID: ${result.insertid}`)
    }

  });
  pool.end; 
}

const createAuthor = (req, res) => //Add identities
{
  pool.query(`INSERT INTO author (author_name, bio, author_publisher) VALUES ('${decodeURIComponent(req.params.author)}', '${decodeURIComponent(req.params.bio)}', '${decodeURIComponent(req.params.publisher)}');`, (err, result) => 
  {
    if(!err)
    { 
      res.status(201).send(`Author added with ID: ${result.insertid}`)
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
  createAuthor
} 