// Frameworks and basics things
const express = require('express');
const app = express();
const PORT = 5000;
const cors = require('cors');
const cookie = require('cookie-parser');


app.use(cors({
    origin : 'http://localhost:3000',
    credentials : true
}));
app.use(cookie());
app.use(express.json());


// Own created things
const db = require('./DB');
const User = require('./Routes/Users');
const Cart = require('./Routes/Cart');

// 'http://localhost:5000/getUserCart'

// this is working fine.
app.get('/', (req, res) => {
    const query = 'select * from user_data';
    db.query(query, (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            console.log(result);
            res.json(result);
        }
    })
})

// inserting data into the userdb
app.use('/', User);
app.use('/', Cart);

// App server is running
app.listen(PORT, function(err){
    if(err) throw err;
    else{
        console.log(`${PORT} is running!`);
    }
})