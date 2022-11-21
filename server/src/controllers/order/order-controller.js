const cartModal = require("../../models/cart-modal");
const orderModal = require("../../models/order-modal");
const productModel = require("../../models/product-model");
const userModel = require("../../models/user-model");
const  uniqueid = require('uniqueid');


const createOrder=async(req,res)=>{
    try {
        // console.log('req body create body',req.body);
        const {paymentIntent}=req.body.stripeResponse
        // first we find the user
        let {email}=req.userCredientials.firebaseUser;
        let findUser=await userModel.findOne({email,}).exec();
        
        // find cart because we pass the it products in order
        let {products}=await cartModal.findOne({orderBy:findUser._id}).exec()
        
        // create new order
        let createNewOrder=await new orderModal({
            products,
            orderBy:findUser._id,
            paymentIntent,
        }).save();


        //increment in sold and decrement in quantity
        //we use the Model.bulkWrite method https://mongoosejs.com/docs/api/model.html#model_Model-bulkWrite
        const bulkOption=products.map((item)=>{
            return {
                updateOne:{
                    filter:{_id:item.product._id},
                    update:{$inc:{quantity:-item.count,sold:+item.count}}
                }
            }
        })
        let updatedProducts=await productModel.bulkWrite(bulkOption,{})
        // console.log("Updated product count and sold",updatedProducts);


        // console.log("new order created",createNewOrder);
        res.json({isOrderCreated:'ok'})
    } catch (error) {
        console.log('create order error',error.message);
    }
}

const createCashOrder=async(req,res)=>{
    try {
        // console.log('req body create body',req.body);
        const {COD}=req.body
        let id=uniqueid('prefix');
        console.log("id",(Math.random()*9882229).toLocaleString());
        // first we find the user
        if(!COD)return res.status(400).send('Failed Cash order')
        
        let {email}=req.userCredientials.firebaseUser;
        let findUser=await userModel.findOne({email,}).exec();
        
        // find cart because we pass the it products in order
        let {products,cartTotal,totalAfterDiscount}=await cartModal.findOne({orderBy:findUser._id}).exec()
        // create amount
    
        // create new order
        let createNewOrder=await new orderModal({
            products,
            orderBy:findUser._id,
            paymentIntent:{
                id:(Math.random()*9882229).toLocaleString(),
                status:"Cash On Delivery",
                currency:"usd",
                amount:(totalAfterDiscount||cartTotal )*100,
                created:Date.now(),
                payment_method_types:['cash'],

            },
            orderStatus:"Cash On Delivery",

        }).save();
        console.log("new order",createNewOrder);

        //increment in sold and decrement in quantity
        //we use the Model.bulkWrite method https://mongoosejs.com/docs/api/model.html#model_Model-bulkWrite
        const bulkOption=products.map((item)=>{
            return {
                updateOne:{
                    filter:{_id:item.product._id},
                    update:{$inc:{quantity:-item.count,sold:+item.count}}
                }
            }
        })
        let updatedProducts=await productModel.bulkWrite(bulkOption,{})
        // console.log("Updated product count and sold",updatedProducts);


        // console.log("new order created",createNewOrder);
        res.json({isOrderCreated:'ok'})
    } catch (error) {
        console.log('create order error',error.message);
    }
}


const getOrders=async(req,res)=>{
    try {
        // find user
        let {email}=req.userCredientials.firebaseUser;
        let findUser=await userModel.findOne({email,}).exec();
        // get login user order
        let findOrders=await orderModal.find({
            orderBy:findUser._id
        }).sort("-createdAt").populate('products.product').exec()
        console.log("findOrders",findOrders);
        res.json(findOrders);
    } catch (error) {
        console.log('get orders error',error.message);
        
    }
}
module.exports={
    createOrder,
    getOrders,
    createCashOrder
}