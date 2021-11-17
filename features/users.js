const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

//-------------------USER QUERIES----------------------

// Post/create new user with email and password only
const createNewUser = (req, res) => {
  pool.query(`INSERT INTO customer (email, password)
              VALUES ('${req.params.email}', '${req.params.password}');`
              , (err, result) =>
  {
    if(!err)
    { 
      res.status(201).send(`Customer Added`)
    }
  });
  pool.end;
}

// Post/create new user with address information
const createNewUser1 = (req, res) => {
  pool.query(`DO $$
              DECLARE newID integer;
              BEGIN
                INSERT INTO customer (email, password)
                VALUES ('${req.params.email}', '${req.params.password}') RETURNING customer_id INTO newID;
                INSERT INTO address (street_number, street_name, city, country_id, customer_id)
                VALUES ('${req.params.street_number}', '${req.params.street_name}', '${req.params.city}', '${req.params.country_id}', @newID);
              END $$;
              ('${req.params.email}', '${req.params.password}');`
              , (err, result) =>
  {
    if(!err)
    { 
      res.status(201).send(`Customer Added`)
    }
  });
  pool.end;
}

// Put/Update user info except email
const updateUser = (req, res) => {
  pool.query(`INSERT INTO customer (email, password)
              VALUES ('${req.params.email}', '${req.params.password}');`
              , (err, result) =>
  {
    if(!err)
    { 
      res.status(201).send(`Customer Updated`)
    }
  });
  pool.end;
}

// Get user information
const viewUserProfile = (req, res) => {
  pool.query(`SELECT customer.email, customer.first_name, customer.last_name, address.street_number, address.street_name, address.city, address.country_id
                      FROM customer
                      INNER JOIN address
                      ON address.customer_id = customer.customer_id
                      WHERE customer.email = '${req.params.email}'`
                      , (err, result) =>
  {
    if(!err)
    {
      res.status(200).json(result.rows);

      //res.end;
    }
  });
  pool.end;
}

// Get/ Retrieve user credit card info
const getCreditCards = (req, res) => {
  pool.query(`SELECT * FROM credit_card WHERE customer_id = '${req.params.customer_id}'`, (err, result) => 
  {
    if(!err)
    {
      res.status(200).json(result.rows);

      //res.end;
    }
  });
  pool.end;
}
 // Post/ Add user credit card information
const updateCreditCards = (req, res) => {
  pool.query(`INSERT INTO credit_card (customer_id, card_number, exp_date, code)
              VALUES ('${req.params.customer_id}', '${req.params.card_number}', '${req.params.exp_date}', '${req.params.code}');
              `, (err, result) =>
  {
    if(!err)
    { 
      res.status(201).send(`Card Added`)
    }
  });
  pool.end;
}

// Methods need to be created for all these
module.exports = {
    createNewUser,
    createNewUser1,
    updateUser,
    viewUserProfile,
    getCreditCards,
    updateCreditCards
  }