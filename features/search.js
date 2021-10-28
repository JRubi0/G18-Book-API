const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

//-------------------BOOK QUERIES----------------------
const getBooks = (req, res) => {
    $pageNum = parseInt(req.params.page);
    $offsetVar = ($pageNum - 1) * 20;
    console.log($offsetVar);
    pool.query(`SELECT * FROM book ORDER BY book_id LIMIT 20 OFFSET $offsetVar`, (err, result) => 
    {
      if(!err)
      {
        res.status(200).json(result.rows);
  
        //res.end;
      }
    });
    pool.end;
  }


const getBooksByGenre = (req, res) => {
  pool.query(`SELECT * FROM book WHERE genre=${req.params.genre}`, (err, result) => 
  {
    if(!err)
    {
      res.status(200).json(result.rows[0]);

      res.end;
    }
  });
  pool.end;
} 

const getBooksTopSellers = (req, res) => {
    pool.query(`SELECT * FROM book ORDER BY copies_sold LIMIT ${req.params.limit}`, (err, result) => 
    {
      if(!err)
      {
        res.status(200).json(result.rows[0]);
  
        res.end;
      }
    });
    pool.end;
} 

const getBooksAboveRating = (req, res) => {
    pool.query(`SELECT DISTINCT book.book_id, title, genre, author_name, price, ROUND(AVG(star_rating), 1) as rating
                FROM book, author, book_author, reviews                                            
                WHERE book.book_id = book_author.book_id AND author.author_id = book_author.author_id AND reviews.book_id = book.book_id
                GROUP BY book.book_id, author_name, star_rating, review_id
                HAVING AVG(star_rating) > ${req.params.rating}
                ORDER BY rating DESC`, (err, result) => 
    {
      if(!err)
      {
        res.status(200).json(result.rows[0]);
  
        res.end;
      }
    });
    pool.end;
} 

module.exports = {
    getBooks,
    getBooksByGenre,
    getBooksTopSellers,
    getBooksAboveRating,
  } 