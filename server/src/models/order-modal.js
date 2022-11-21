const mongoose = require('mongoose');
const {ObjectId}=mongoose.Schema
const orderSchema=new mongoose.Schema({
     products:[
       { 
            product:{
                type:ObjectId,
                ref:"ProductModel"
            },
            count:Number,
            color:String,
        }
    ],
    paymentIntent:{},
    orderStatus:{
        type:String,
        default:"Not Processed",
        enum:[
            "Not Processed",
            "Cash On Delivery",
            "Processing",
            "Dispatched",
            "Completed",
            "Canceled",

        ]
    },
    orderBy:{
        type:ObjectId,
        ref:'user'
    }

},{timestamps:true})

module.exports=mongoose.model('orderModel',orderSchema)