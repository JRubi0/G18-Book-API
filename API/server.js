const {Client} = require('pg')

const client = new Client({
    host: "archegos.ddns.net",
    user: "juanrubio",
    port: 5432,
    password: "Group18",
    database: "BookStore"
})

module.exports = client