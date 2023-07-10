// Frameworks and basics things
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const cookie = require('cookie-parser');


app.use(cors({
    origin : 'https://ecommerce-app-gaurav.netlify.app/',
    credentials : true
}));
app.use(cookie());
app.use(express.json());



// Own created things
const db = require('./DB');
const User = require('./Routes/Users');
const Cart = require('./Routes/Cart');


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