const mongoose = require('mongoose');
const {ObjecID}=mongoose.Schema;

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true, // it remove the extra spaces before and after the name
        required:'Name is required ',  // we can also write the message 
        minLength:[2,"Too short"],  // it will show the minimum length and message if not fullfilled
        maxLength:[32,"Too long"] //it will show the maximum lengt and message if it increased
    },
    slug:{
        type:String,
        unique:true,
        lowecase:true,
        index:true,  // it help us to find particularly slug 

    }
},
{
    timestamps:true // it will show the create and update date
})

module.exports=mongoose.model('category',categorySchema)