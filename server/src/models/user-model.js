const mongoose = require('mongoose');
const {ObjectID}=mongoose.Schema;

const userSchema=new mongoose.Schema({
    name: String,
    tokenId:String,
    phoneNumber:String,
    email:{
        type:String,
        required:true,
        index:true // it will allow us to query database more effeicently
    },
    role:{
        type:String,
        default:"subscriber"
    },
    cart:{
        type:Array,
        default:[]
    },
    address: [{
            buyerName:{type:String,required:true},
            country:String,
            city:String,
            postalCode:String,
            homeAddress:String,
        }],
    // wishlist:[{type:ObjectID,ref:"Product"}]
    
},
{timestamps:true});

module.exports=mongoose.model('User',userSchema)