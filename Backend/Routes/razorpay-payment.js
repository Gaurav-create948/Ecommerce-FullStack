const express = require('express');
const { CreateOrder, VerifyPayment } = require('../Controller/Payment');
const app = express();
// this piece of code is getting post request from frontend when clicking buy button this code is creating the order 
app.route('/')
.post(CreateOrder)


// this code is working for verification the payments after doing payment
app.route('/verify')
.post(VerifyPayment)

module.exports = app;
  