const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const { addToCart, getCart, updateCart } = require('../Controller/cart.js');

app.route('/cart')
.get(getCart)
.patch(updateCart)

app.route('/product/cart')
.post(addToCart)

module.exports = app;