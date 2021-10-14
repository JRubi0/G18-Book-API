//---------------------------//
const client = require('../server.js');
const express = require('express');
const app = express();

app.listen(3300, ()=>{
    console.log("Sever is running on port 3300");
}) 

client.connect();
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