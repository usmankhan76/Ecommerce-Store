// import orderModal = require("../../models/order-modal");

const orderModal = require("../../models/order-modal");


const showOrders=async(req,res)=>{
    try {
        let getOrders=await orderModal.find({})
        .sort("-createdAt")
        .populate("products.product")
        .exec()
        res.json(getOrders);

    } catch (error) {
        console.log("ShowOrder error",error.message);
    }
}
const updateOrderStatus=async(req,res)=>{
    try {
        //find order
        console.log("updateOrder body",req.body);
        const {orderId,orderStatus}=req.body


        let updateOrder=await orderModal.findByIdAndUpdate(orderId,{orderStatus},{new:true}).exec()
        res.json(updateOrder);

    } catch (error) {
        console.log("ShowOrder error",error.message);
    }
}
module.exports={
    showOrders,
    updateOrderStatus
}