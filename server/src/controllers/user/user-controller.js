const cartModal = require("../../models/cart-modal");
const productModel = require("../../models/product-model");
const userModel = require("../../models/user-model");


function user(req,res) {
     return res.json({data:'You just hit user end point'})

}
const userCart=async(req,res)=>{
    try {
         let {firebaseUser}=req.userCredientials;
    let {email}=firebaseUser;
    const {cart}=req.body
    let products=[]
    console.log("body carts",cart)
    // first we check the user
    const findUser= await userModel.findOne({email}).exec();
    //second we check the cart of existing user
    const cartExistByCurrentUser=await cartModal.findOne({orderBy:findUser._id}).exec()
    // third if exist then empty it 
    if(cartExistByCurrentUser){

        cartExistByCurrentUser.remove()
    }
    // fourth we crate object from fornt End and after it we save it in Db 
    for (let i = 0; i < cart.length; i++) {
        let object={};

        object.product=cart[i]._id;
        object.count=cart[i].count;
        object.color=cart[i].color;
        let productPrice=await productModel.findById(cart[i]._id).select("price").exec(); // in this step we find out product and get out only price field 
        console.log("product price",productPrice.price)
        object.price=productPrice.price;
        

        products.push(object);
    }

    // for  total amout of  cart
    let cartTotal=0;
    for (let i = 0; i < products.length; i++) {
        cartTotal=cartTotal+(products[i].price*products[i].count);
    }
    // console.log("cartTotal in ba",cartTotal)
    let newCart=await new cartModal({
        products,
        cartTotal,
        orderBy:findUser._id
    }).save();

    // console.log("USer cart",newCart)
    res.json({ok:true})

    } catch (error) {
        console.log("USer Cart erro",error.message)
    }
   



}

const getUserCart=async(req,res)=>{
    try {
        const {firebaseUser:{email}}=req.userCredientials;
    const findUser=await userModel.findOne({email})
    const cart=await cartModal.findOne({orderBy:findUser._id})
    .populate('products.product',)// if don't use populate it will also show the whole product   entries , but we also fix fields of product by defining them in next parameter
    .exec()
    return res.json(cart);
    } catch (error) {
        console.log("GEt user Cart error",error.message)
    }
    
}

const emptyUserCart=async(req,res)=>{
    try {
        const {firebaseUser:{email}}=req.userCredientials;
        const findUser=await userModel.findOne({email});
        const deletCart=await cartModal.findOneAndRemove({orderBy:findUser._id}).exec() 
        res.json(deletCart)
    } catch (error) {
        console.log("Empty User Cart error",error.message)
    }
}
const saveAddress=async(req,res)=>{
    try {
        console.log("save Addres",req.body.cartAddress)
        const {country,city,postalCode,phoneNumber,firstName,homeAddress}=req.body.cartAddress
        let adrs=[{
                country,
                city,
                postalCode,
                buyerName:firstName,
                homeAddress

            }]
            console.log("check adrs",adrs)
        const{firebaseUser:{email}}=req.userCredientials;
        const findUser=await userModel.findOneAndUpdate({email},{
            phoneNumber,
            address:adrs
        }).exec();
        return res.json({ok:true})

    } catch (error) {
        console.log("Save address error",error.message)
        
    }
}

module.exports={
    user,
    userCart,
    getUserCart,
    emptyUserCart,
    saveAddress
}