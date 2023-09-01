
const cartModal = require('../../models/cart-modal')
// const couponModal = require('../../models/coupon-modal')
const coupenModal=require('../../models/coupon-modal')
const userModel = require('../../models/user-model')

const createCoupon=async(req,res)=>{
    try {
        console.log("This is coupon",req.body)
        const{name,expiry,discount}=req.body.coupon
        const newCoupon=await new coupenModal({name,expiryDate:expiry,discount}).save()
        res.json(newCoupon)
    } catch (error) {
        console.log('create coupon error',error.message)
    }
}
const deleteCoupon=async(req,res)=>{
    try {
        console.log("This is coupon id",req.params)
        const deleteCoupon=await  coupenModal.findByIdAndDelete(req.params.couponId).exec()
        res.json(deleteCoupon)
    } catch (error) {
        console.log('deleteCoupon coupon error',error.message)
    }
}
const listCoupons=async(req,res)=>{
    try {
        const listCoupons=await coupenModal.find({}).sort({createdAt:-1}).exec()
        //created at will give us the latest one
        res.json(listCoupons)
    } catch (error) {
        console.log('listCoupons coupon error',error.message)
    }
}

const applyCoupon=async(req,res)=>{
    try {
        console.log("coupone ",req.body)
        const{coupon}=req.body
        const {firebaseUser:{email}}=req.userCredientials;
        // first we find the the cupon in correct or incorrect
        // const findCoupon=await couponModal.findOne({name:coupon}).exec()
        const findCoupon=await coupenModal.findOne({name:coupon}).exec()
        if(findCoupon===null){
            return res.json({err:'coupon is invalid'});
        }

        // second find the user who are using in his cart
        const findUser=await userModel.findOne({email}).exec()
        if(findCoupon===null){
            return res.json({err:'user is not find'});
        }

        //third find Cart of login user
        const {cartTotal}=await cartModal.findOne({orderBy:findUser._id}).exec()

        // apply coupon to cartTotal
        let totalAfterDiscount=cartTotal-((cartTotal*findCoupon.discount)/100).toFixed(2)
        await cartModal.findOneAndUpdate(
            {orderBy:findUser._id},
            {totalAfterDiscount},
            {new:true} // this will return us the updated one 
            ).exec()
        res.json(totalAfterDiscount)
    } catch (error) {
        
    }
}


module.exports={
    createCoupon,
    deleteCoupon,
    listCoupons,
    applyCoupon
}