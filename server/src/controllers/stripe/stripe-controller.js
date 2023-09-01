const cartModal = require('../../models/cart-modal');
const userModel = require('../../models/user-model');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent=async(req,res)=>{
    try {
        
        const {email}=req.userCredientials.firebaseUser
    //find user
    const findUser=await userModel.findOne({email}).exec()
    // find cart and getTotal
    const findCart= await cartModal.findOne({orderBy:findUser._id}).exec()
    let {totalAfterDiscount,cartTotal}=findCart
    let amount=totalAfterDiscount?totalAfterDiscount:cartTotal;
    const paymentIntent=await stripe.paymentIntents.create({
        amount:amount*100,
        currency:'usd'
    })
   
    res.send({
        clientSecret:paymentIntent.client_secret,
        total:cartTotal,
        totalAfterDiscount,
        totalPayeable:amount
    })
        
    } catch (error) {
        console.log("CreatePaymentIntent error",error.message)
    }
   
}

module.exports={
    createPaymentIntent
}