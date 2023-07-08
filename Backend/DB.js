const mysql = require('mysql');

const db = mysql.createConnection({
    host : '127.0.0.1',
    user : 'root',
    password : 'Sonu@12345',
    database : 'user',
    port : 3304     
})


module.exports = db;