// Not active yet also this top section will be in the index.js file later.
// Profile Management routes that uses the db object for handling queries
// app.post('/customer/new'), db.createNewUser)           // call to create new customers
// app.get('customer/:id', db.getUserByEmail)             // call to retrieve customer by email (ADMIN?)
// app.put('/customer/details', db.updateUserDetails)     // call to update customer details
// app.post('/customer/payment', db.addCreditCard)        // call to add credit cards
// app.get('/customer/payment', db.getCreditCard)         // call to pull all cards on account

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

/*
//I wrote the preliminary queries for these requirements  --Bryan
//Create user
	INSERT INT customer (username, password, name, email, home_address) VALUES
	($username, $password, $name, $email, $home_address);

//Get user
	SELECT * FROM customer WHERE username LIKE "$username";
*/

const updateUser = (req, res) => {
  console.log(req.params.field + " " + req.params.newValue + " " + req.params.username);
  $custnum = parseInt(req.params.username);
  pool.query(`UPDATE customer SET ${req.params.field} = '${req.params.newValue}' WHERE customer_id = ${$custnum}`, (err, result) => 
  {
    if(!err)
    {
      res.status(200).json(result.rows);

      //res.end;
    }
  });
  pool.end;
} 

const getCreditCards = (req, res) => {
  pool.query(`SELECT * FROM credit_card WHERE email = '${req.params.email}'`, (err, result) => 
  {
    if(!err)
    {
      res.status(200).json(result.rows);

      //res.end;
    }
  });
  pool.end;
} 
const updateCreditCards = (req, res) => {
  //console.log(req.params.card_number/exp.date/code/email);
  //add credit card for the user
  pool.query(`INSERT INTO users (email, credit_card, exp_date, code) 
                VALUES ${req.params.email}, ${req.params.card_number}, ${req.params.exp_date}, ${req.params.code}'`, (err, result) => 
  {
    if(!err)
    { 
      res.end;
    }
  });
  pool.end;
} 
/*
	UPDATE customer SET $field = $newValue WHERE username = $username;

//Add credit card
	INSERT INTO credit_card (card_number, exp_date, code, email) VALUES
	($card_number, $exp_date, $code, $email);
*/



// Methods need to be created for all these
module.exports = {
    //users.js
    updateUser,
    getCreditCards,
    updateCreditCards,
    //createNewUser,
    //getUserByEmail,
    //updateUserDetails,
    //addCreditCard,
    //getCreditCar
  }