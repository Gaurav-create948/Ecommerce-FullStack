const crypto = require("crypto");
const Razorpay = require('razorpay');
const instance = new Razorpay({ key_id: process.env.key_id, key_secret: process.env.key_secret });
//process.env.key_id

// Creating Order.
async function CreateOrder (req, res){
    // Getting price of the item
    const{price} = req.body;
    const options = {
        amount: Number(price)*100,  // amount in the smallest currency unit
        currency: "INR",
    };
    // Here creating the instance of order for curr item with given price
    instance.orders.create(options, function(err, order) {
        if(err){
            return res.send({code : 404, message : "server error"});
        }
        return res.send({code:200, message : "order created" , data : order, keyId : process.env.key_id});
    });
}


// Verifying Payment. 

async function VerifyPayment(req, res) {
    // Here signature is getting created with razorpay order id and payment id
    let body=req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
    
    // this signature is getting created with key secret with crypty hash function
    let expectedSignature = await crypto.createHmac('sha256', process.env.KEY_SECRET).update(body.toString()).digest('hex');
    // let response = {"signatureIsValid":"false"}

    // if expected signature and body signature is equal then verifying the payment.
    if(expectedSignature === req.body.razorpay_signature){
        // response={"signatureIsValid":"true"}
        res.send({code : 200, message : 'Payment Verified'});
    }
    else{
        res.send({code : 404, message : 'Payment Not Verified'});
    }
}

module.exports = {CreateOrder, VerifyPayment};

