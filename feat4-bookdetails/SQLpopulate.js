function bookpopulate(criteria) 
{
    //Find text entered from search box through SQL query
var pg = require(pg);
var connectionString = "postgres://postgres:Skwip2@(0)@localhost/127.0.0.1:5432/BookStore";
var pgClient = new pg.Client(connectionString);
pgClient.connect();
}