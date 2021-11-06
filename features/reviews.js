const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

//-------------------BOOK QUERIES----------------------
const postComment = (req, res) => {
    pool.query(`INSERT INTO reviews (book_id, review_comment, customer_id) 
                VALUES ${req.params.book_id}, ${req.params.review_comment}, ${req.params.customer_id}`, (err, result) => 
    {
      if(!err)
      {  
        //res.end;
      }
    });
    pool.end;
  }


const postRating = (req, res) => {
  //console.log(req.params.genre);
  pool.query(`INSERT INTO reviews (book_id, star_rating, customer_id) 
                VALUES ${req.params.book_id}, ${req.params.star_rating}, ${req.params.customer_id}'`, (err, result) => 
  {
    if(!err)
    {
      res.end;
    }
  });
  pool.end;
} 

const getReviews = (req, res) => {
  //console.log(parseInt(req.params.number));
  pool.query(`SELECT * FROM reviews`, (err, result) => 
  {
    if(!err)
    {
      res.status(200).json(result.rows);

      res.end;
    }
  });
  pool.end;
} 

const getAvgRating = (req, res) => {
  //console.log(parseInt(req.params.rating));
  pool.query(`SELECT title, ROUND(AVG(star_rating)) as AverageRating FROM book, reviews 
                WHERE book.book_id = reviews.book_id AND book.book_id = ${req.params.book_id} GROUP BY book.book_id`, (err, result) => 
  {
    if(!err)
    {
      res.status(200).json(result.rows);

      res.end;
    }
  });
  pool.end;
} 

module.exports = {
    postComment,
    postRating,
    getReviews,
    getAvgRating,
  } 