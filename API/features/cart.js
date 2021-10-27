/* Not active yet also this top section will be in the index.js file later.

// cart routes that uses the db object for handling queries
app.post('/cart'), db.createNew)        // call to create new cart CREATE_NEW
app.put('/cart/items/add', db.updateTo)       // call to update book(s) in cart UPDATE_TO
app.get('/cart/items', db.getData)     // call to list all book(s) in cart GET_DATA
app.delete('/cart/items/delete', db.deleteCartItem) // call to delete a book from cart DELETE_THIS
*/

/*const queryString = window.Location.
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
if (console.log(urlParams.has('cart'))) {
  const CREATE_NEW =
    'INSERT INTO cart(cart_id, customer_id, book_id) VALUES (2, 3, 76)';
  if (console.log(urlParams.has('items'))) {
    const GET_DATA = 0;
    if (console.log(urlParams.has('add'))) {
      const UPDATE_TO = 0;
    }
    if (console.log(urlParams.has('delete'))) {
      const DELETE_THIS = 0;
    }
  }
}*/

/*const createNew = (request, response) => {
  pool.query(this.CREATE_NEW, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
} */
/*
function updateQueryStringParameter(uri, key, value) {
  var re = new RegExp("([?&])")
}*/


// Methods need to be created for all these
module.exports = {
  //CREATE_NEW,
  //GET_DATA,
  //UPDATE_TO,
  //DELETE_THIS,
  //createNewCart,
  //addCartItem,
  //getCartItems,
  //deleteCartItem
  }