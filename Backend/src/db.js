const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "c0Mmun1tyEditi0n",
    database: "cinema"
})

module.exports = db