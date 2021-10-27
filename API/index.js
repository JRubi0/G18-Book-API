

const express = require('express');       // pulling in express installed in .json
const bodyParser = require('body-parser') // pulling in body-parser from json
const app = express();                    // initialize app
//const dotenv = require('dotenv');
require('dotenv').config();
const port = 3000
const db = require('./queries')

//dotenv.config({ path: './.env' });// Set path to .env file

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

// base route that does nothing. just an example
app.get('/', (request, response) => {
    response.json({ info: 'You need to specify a path for a valid query!' })
  })

/* Public functions when to use
     * HTTP METHOD  |  REST API  |  SQL / POSTGRES
     *   GET        |   "Read"   |  SELECT
     *   POST       |  "Create"  |  INSERT
     *   PUT        |  "Update"  |  UPDATE
     *   DELETE     |  "Delete"  |  DELETE
     */

// books retrieval routes that uses the db object for handling queries
app.get('/books', db.getBooks)
app.get('/books/:id', db.getBookById)
//app.get('/customer', db2.getC)
//app.get('/customer/:id', db2.getCById)
//app.post('/books', db.createBook)
//app.put('/books/:id', db.updateBook)
//app.delete('/books/:id', db.deleteBook)

// Start server
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })