const cartModal = require("../../models/cart-modal");
const orderModal = require("../../models/order-modal");
const productModel = require("../../models/product-model");
const userModel = require("../../models/user-model");

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
module.exports={
    createOrder
}