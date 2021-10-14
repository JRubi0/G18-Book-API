const express = require('express');
const app = express();
const client = require('./server.js')

app.listen(3300, ()=>{
    console.log("Sever is running on port 3300");
}) 

client.connect();