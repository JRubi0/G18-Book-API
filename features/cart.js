const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

// Creates a new Cart linked to customer_id that is empty
// cart_id generated and user does not need to know.
const addCartItem = (req, res) => {
  pool.query(`INSERT INTO cart (customer_id, book_id) 
              VALUES ('${decodeURIComponent(req.params.customer_id)}', '${decodeURIComponent(req.params.book_id)}');
              `, (err, result) => {
    if (!err) {
      res.status(201).send(`Book ` + (req.params.book_id) + ` was succcessfully added to cart.`)
    }

  });
  pool.end;
}

// Lists all the items in the cart.
// THIS METHOD IS COMPLETE
const getCartItems = (req, res) => { 
  pool.query(`SELECT cart.book_id, book.title, book.price
              FROM cart
              INNER JOIN book
              ON book.book_id = cart.book_id
              WHERE customer_id ='${req.params.customer_id}'
              `, (err, result) => {
    if (!err)
    {
      res.status(200).json(result.rows);
    }
  });
  pool.end;
}

// Deletes a book from customer's cart
// THIS METHOD has a few bugs that need to be worked out
const deleteCartItem = (req, res) => {
  pool.query(`BEGIN;
              DELETE FROM cart
              WHERE cart_id
              IN (
                SELECT cart_id
                FROM cart
                WHERE customer_id = '${req.params.customer_id}' 
                AND book_id = '${req.params.book_id}'
                LIMIT 1)
              COMMIT;
              `, (err, result) => {
    if (!err) {
      res.status(201).send(`Cart ID: ${result.cart_id}`) // UPDATE "book_title removed from shopping cart"
    }

  });
  pool.end;
}

// Deletes all books from customer's cart
// THIS METHOD IS COMPLETE
const deleteAllItems = (req, res) => {
  pool.query(`BEGIN;
              DELETE FROM cart WHERE customer_id = '${req.params.customer_id}';
              COMMIT;
              `, (err, result) => {
    if (!err) {
      res.status(201).send(`Cart ID: ${result.cart_id}`) // UPDATE "book_title removed from shopping cart"
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