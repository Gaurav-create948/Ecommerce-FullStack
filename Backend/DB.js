const mysql = require('mysql');

const db = mysql.createConnection({
    host : 'https://ecommerce-app-jof9.onrender.com',
    user : 'root',
    password : 'Sonu@12345',
    database : 'user',
    port : 3306     
})


module.exports = db;