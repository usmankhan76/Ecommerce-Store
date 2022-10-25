
const mongoose = require('mongoose');
const couponSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        minLength:['6','too Short'],
        maxLength:['12','too long'],
        unique:true,
        uppercase:true,
    },
    expiryDate:{
        type:Date,
        required:true,
    },
    discount:{
        type:Number,
        required:true
    }

},{timestamps:true})

module.exports=mongoose.model('coupenModal',couponSchema)