//--This sets a port for your script to run on. Pick a random number from 1024 to 49150 to set this to.--//
// If two scripts have the same port, the scripts will not work! -//
const PORT = 3300;

//--This just creates a local server for --//
const client = require('../scripts/server.js');

const express = require('express');
const app = express();

app.listen(PORT, ()=>{
    console.log("Sever is running on port " + PORT);
})
//---------------------------//

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
