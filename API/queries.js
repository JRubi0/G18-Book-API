const dotenv = require('dotenv'); 
dotenv.config({ path: './.env' });// Set path to .env file
// FIX ME need to create path to all files in features that contain query data

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})
// Access the environment variable using method process.env.VARIABLE_NAME
// located in node_modules. Installed when package.json was created.

// pulling in cart data
const CREATE_NEW = require('./features/cart')

// creating a generic query to use with all features this one is for creating
const createNew = (request, response) => {
  pool.query(this.CREATE_NEW, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
} 

