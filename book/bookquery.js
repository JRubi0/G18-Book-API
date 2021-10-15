//--This sets a port for your script to run on. Pick a random number from 1024 to 49150 to set this to.--//
// If two scripts have the same port, the scripts will not work! -//
const PORT = 3300;

//--This just creates a local server for running queries on.--//
const client = require('../scripts/server.js');

const path = require("path");

const express = require('express');
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.listen(PORT, ()=>{
    console.log("Sever is listening on port " + PORT);
})
//---------------------------//

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
  });

app.get("/bookdetails", (req, res) => {
    res.sendFile(path.join(__dirname, "bookdetails.html"));
});

app.get('/book', (req, res)=>
{
    client.query(`SELECT * from book`, (err, result)=>
    {
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})
client.end;

app.get('/book/:book_id', (req, res)=>
{
    client.query(`SELECT * from book where book_id=${req.params.book_id}`, (err, result)=>
    {
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})
