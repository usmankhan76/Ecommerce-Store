const mongoose = require('mongoose');
const {ObjectId}=mongoose.Schema;

const cartSchema=new mongoose.Schema({
    products:[
       { 
            product:{
                type:ObjectId,
                ref:"ProductModel"
            },
            count:Number,
            price:Number,
            color:String,
        }
    ],
    cartTotal:Number,
    totalAfterDiscount:Number,
    orderBy:{
        type:ObjectId,
        ref:'user'
    }// this is the important field because on the bases of this we will fetch cart of login user
},{timestamps:true})
    
    

module.exports=mongoose.model("CartModal",cartSchema)