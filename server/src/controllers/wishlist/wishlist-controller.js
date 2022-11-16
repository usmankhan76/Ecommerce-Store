
const userModel = require("../../models/user-model");

let getWishlist=async(req,res)=>{
    try {
        let {email}=req.userCredientials.firebaseUser;
        let allWhishlist=await userModel.findOne({email}) //we only need the current user wishlist 
        .select("wishlist") // the user Modela have alot of things so we only need wishlist
        .populate('wishlist') // and we also have need to show products because it only using the id's
        .exec()
        res.json(allWhishlist)
    } catch (error) {
        console.log("get Wishlist error",error.message);
    }
}

let addToWishlist=async (req,res)=>{
    try {
        console.log('addToWishlist body',req.body);
        let {productId}=req.body;
        let {email}=req.userCredientials.firebaseUser;
        //first find the user and update wishlist
        let saveProductToWishList=await userModel.findOneAndUpdate(
                {email},
                {$addToSet:{wishlist:productId}} // this will prevent us to save same item to wihslist more then once
            ).exec() 
        res.json({saveProductToWishList:true})

    } catch (error) {
        console.log("addToWishlist error",error.message);
        
    }
}

let removeFromWishlist=async (req,res)=>{
    try {
        console.log('removeFromWishlist body',req.body);
        let {productId}=req.params;
        let {email}=req.userCredientials.firebaseUser;
        //first find the user and update wishlist
        let saveProductToWishList=await userModel.findOneAndUpdate(
                {email},
                {$pull:{wishlist:productId}} // it will remove the product from wihslist 
            ).populate('wishlist').exec() 
        res.json({DeleteProductFromWishList:true})
        
    } catch (error) {
        console.log("removeFromWishlist error",error.message);
        
    }
}
module.exports={
    getWishlist,
    addToWishlist,
    removeFromWishlist
}