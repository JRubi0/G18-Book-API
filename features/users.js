const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})


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
    getCreditCards,
    updateCreditCards,  
    //createNewUser,
    //updateUser,
    //getUserByEmail,
    //updateUserDetails,
    //addCreditCard,
    //getCreditCar
  }