const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const { addToCart, getCart, updateCart, deleteCartItem } = require('../Controller/cart.js');

app.route('/cart')
.get(getCart)
.patch(updateCart)

app.route('/cart/deleteCartItem')
.patch(deleteCartItem)

app.route('/product/cart')
.post(addToCart)

module.exports = app;