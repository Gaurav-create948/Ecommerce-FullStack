const Jwt = require('jsonwebtoken');
const bycrypt = require('bcrypt');
const db = require('../DB');


// hashing password
async function saveData(Password) {
    const Salt = await bycrypt.genSalt(10);
    const hashPass = await bycrypt.hash(Password, Salt);
    return hashPass;
}

// Register Controller
async function Register(req, res) {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await saveData(password);
        const query = `insert into user_data (user_name, user_email, password) values('${username}', '${email}', '${hashedPassword}')`;
        db.query(query, (error, result) => {
            if (error) res.status(403).json(error);
            if (result.affectedRows > 0) {
                res.status(200).json('user registered');
            }
        });
    }
    catch (error) {
        res.status(403).json(error);
    }
}


// login controller
async function Login(req, res) {
    const { email, password } = req.body;
    console.log("This is email and password", email, password);
    const query = `select * from user_data where user_email = (?)`;
    console.log("This is query -> ", query);
    db.query(query, [email], (error, data) => {
        if (error) console.log("This is error -> ", error);
        else console.log("This is data -> ", data);
    //     if (data.length === 0) return res.status(500).json('user not exist');
    //     const checkPass = bycrypt.compare(req.body.password, data[0].password);
    //     if (!checkPass) return res.status(400).json('wrong password');

    //     const token = Jwt.sign(data[0].user_email, "mysecretkey");

    //     res.cookie("accessToken", token, {
    //         httpOnly : true,
    //         secure : false
    //     })
    //         .status(200)
    //         .json(data[0].user_email);
    })
};


function Logout(req, res) {
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: false,
    });
    return res.status(200).json('cookie deleted');
}

module.exports = { Register, Login, Logout };




