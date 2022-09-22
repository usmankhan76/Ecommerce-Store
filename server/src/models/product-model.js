const mongoose = require('mongoose');
const {ObjectId}=mongoose.Schema;

const productSchema=new mongoose.Schema({
    title:{
        type:String,
        trim:true, // it will remove the spaces
        require:true,
        maxlength:32,
        text:true // on the bases of text we find product in database
    },
    slug:{
        type:String,
        unique:true,
        require:true,
        lowercase:true,
        index:true // on the bases of index we find query the database
 },
    description:{
        type:String,
        require:true,
        maxlength:2000,
        text:true 
 },
    price:{
        type:Number,
        trim:true, // it will remove the spaces
        require:true,
        maxlength:32,
 },
    category:{
        type:ObjectId,
        ref:"category",
    },
    subs:[
     {
        type:ObjectId,
        ref:"SubCategoryModel"
    }
   ],
   quantity:{
       type:Number,
},

   sold:{
       type:Number,
       default:0
   },

   images:{
    type:Array,
   },

   shipping:{
    type:String,
    enum:["Yes","No"] // it means there is not other value but we define ourself
   },

   color:{
    type:String,
    enum:["Black","White","Brown","Silver","Blue"] // it means there is not other value but we define there
   },

   brand:{
    type:String,
    enum:["Apple","Microsoft","Samsung","Lenevo","Asus"] 
   },
//    rating:[{
//     star:Number,
//     postedBy:{type:ObjectId,ref:"User"}
//    }]
 
},
{timestamps:true})

module.exports=mongoose.model("ProductModel",productSchema)