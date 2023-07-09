const db = require('../DB');
const jwt = require('jsonwebtoken');
const getUSerId = require('./helper');


const addToCart = async (req, res) => {
    const id = await getUSerId(req.body.currentUser);
    const { product } = req.body;
    const setProcutToCart = "INSERT INTO user_cart (`user_ref_id`, `product_id`, `product_title`, `product_price`, `product_image`) VALUES(?) ON DUPLICATE KEY UPDATE `product_quantity` = `product_quantity` + 1";

    const values = [
        id,
        product.id,
        product.title,
        product.price,
        product.image
    ]

    db.query(setProcutToCart, [values], (err, result) => {
        if (err) return res.status(403).json(err);
        else if (result.affectedRows > 0) {
            return res.status(200).json('added item to cart successfully');
        }
    })
}

const getCart = async (req, res) => {
    const { accessToken } = req.cookies;
    if(accessToken){
        const email = jwt.verify(accessToken, "mysecretkey");
        const id = await getUSerId(email);
    
        const query = "SELECT * FROM user_cart WHERE user_ref_id = (?)";
    
        db.query(query, [id], (error, result) => {
            if (error) return res.status(403).json(error);
            else return res.status(200).json(result);
        })
    }
    else{
        res.status(403).json('user not authorized');
    }
}

const updateCart = (req, res) => {
//     const { newQuantity, user_id, product_id } = req.body.data;

//     if (newQuantity === 0) {
//         const query = 'DELETE FROM user_cart WHERE user_ref_id = (?) AND product_id = (?)';
//         db.query(query, [user_id, product_id], (error, response) => {
//             if(error) return res.status(403).json(error);
//             else return res.status(200).json(response);
//         })
//     }
//     else {
//         const query = 'UPDATE user_cart SET product_quantity = (?) WHERE user_ref_id = (?) AND product_id = (?)';

//         db.query(query, [newQuantity, user_id, product_id], (error, response) => {
//             if (error) return res.status(403).json(error);
//             else return res.status(200).json(response);
//         })
//     }
}


const deleteCartItem = (req, res) => {
    const {user_id, product_id} = req.body;
    const query = 'DELETE FROM user_cart WHERE user_ref_id = (?) AND product_id = (?)';
    db.query(query, [user_id, product_id], (error, response)=>{
        if(error) return res.status(403).json(error);
        else return res.status(200).json(response);
    });
}

module.exports = { addToCart, getCart, updateCart, deleteCartItem };
