const express = require('express');
const app = express();
const validator = require('validator');
// const { Register, Login, getUserInfo, Logout} = require('../Controller/UserAuth');
const {Register, Login} = require('../Controller/user');

// Protect route before registering the user
function checkBeforeRegister(req , res, next){
    const { username, email, password } = req.body;
    if(validator.isEmail(email)){
        if(!username || !email || !password){
            res.send("every field required");
        }
        else{
            next();
        }
    }
    else{
        res.send(`${email} is not a valid email`);
    }
}

// Protect route before loging the user
function checkBeforLogin(req , res, next){
    const { email, password } = req.body;
    if(validator.isEmail(email)){
        if( !email || !password){
            res.send("every field required");
        }
        else{
            next();
        }
    }
    else{
        res.send(`${email} is not a valid email`);
    }
}

app.route('/register')
.post(checkBeforeRegister, Register)

app.route('/login')
.post(checkBeforLogin, Login)

module.exports = app;