function datasearch(criteria) {
    //Find text entered from search box through SQL query
<<<<<<< HEAD
    var pg = require('pg');
=======
    var pg = require(pg);
>>>>>>> 97a24c4d83ea814c4c31afb63ca8654e847a98d3
    var connectionString = "postgres://postgres:Skwip2@(0)@localhost/127.0.0.1:5432/BookStore";
    var pgClient = new pg.Client(connectionString);
    pgClient.connect();
    var query = pgClient.query("SELECT Title FROM book WHERE Title like " + criteria);
    query.on("row", function(row,result){ 
        result.addRow(row); 
    });      
    return result;
};

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}