const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

// Creates a cart linked to customer_id with a book_id
// cart_id generated and user does not need to know.
const addCartItem = (req, res) => {
  pool.query(`INSERT INTO cart (customer_id, book_id)
              VALUES ('${req.params.customer_id}', '${req.params.book_id}');
              `, (err, result) => 
              {
                if(!err)
                { 
                  res.status(201).send(`Book added to cart`)
                }
            
              });
              pool.end; 
            }

// Lists all the items in the cart
const getCartItems = (req, res) => { 
  pool.query(`SELECT cart.book_id, book.title, book.price
              FROM cart
              INNER JOIN book
              ON book.book_id = cart.book_id
              WHERE cart.customer_id ='${req.params.customer_id}'`, (err, result) => {
    if(!err) {
      res.status(200).json(result.rows);
    }
  });
  pool.end;
}

// Delete's one copy of a book from cart
const deleteCartItem = (req, res) =>
{
  pool.query(`DELETE FROM cart
              WHERE cart_id
              IN (SELECT cart_id
                FROM cart
                WHERE customer_id ='${req.params.customer_id}' 
                AND book_id ='${req.params.book_id}'
                LIMIT 1)
              `, (err, result) => {
    if (!err) {
      res.status(201).send(`DELETED`)
    }
  });
  pool.end;
}

// Deletes cart
const deleteAllItems = (req, res) => {
  pool.query(`DELETE FROM cart 
              WHERE customer_id = '${req.params.customer_id}';
              `, (err, result) => {
    if (!err) {
      res.status(201).send(`DELETED`) 
    }
  });
  pool.end;
}

  module.exports = {
    addCartItem,
    getCartItems,
    deleteCartItem,
    deleteAllItems
  }