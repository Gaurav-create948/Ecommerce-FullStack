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
    const query = `select * from user_data where user_email = (?)`;
    db.query(query, [email], (error, data) => {
        if(error) return res.status(404).json(error);
        if(data.length === 0) return res.status(500).json('user not exist');
        const checkPass = bycrypt.compare(req.body.password, data[0].password);
        if(!checkPass) return res.status(400).json('wrong password');
        
        const token = Jwt.sign(data[0].user_email, "mysecretkey");

        res.cookie("accessToken", token, {
            httpOnly : true, 
            secure : true
        })
        .status(200)
        .json(data[0].user_email);      
    })  
};

module.exports = {Register, Login};




