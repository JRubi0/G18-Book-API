/*const {Client} = require('pg')

const client = new Client({
    host: "archegos.ddns.net",
    user: "juanrubio",
    port: 5432,
    password: "Group18",
    database: "BookStore"
})

module.exports = client

const express = require('express');
const app = express();

app.listen(3300, ()=>{
    console.log("Sever is running on port 3300");
})

client.connect(); */

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