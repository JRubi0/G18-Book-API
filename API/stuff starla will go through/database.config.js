const Pool = require('pg').Pool
//const dotenv = require('dotenv'); // pulling in dotenv installed in .json

// Set path to .env file
//dotenv.config({ path: './.env' });

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})
// Access the environment variable using method process.env.VARIABLE_NAME
// located in node_modules. Installed when package.json was created.
