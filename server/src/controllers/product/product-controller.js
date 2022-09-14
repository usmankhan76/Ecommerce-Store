
const slugify=require('slugify')
const productModel = require('../../models/product-model')

exports.create=async(req,res)=> {
    try {
        console.log("product controller",req.body)
        req.body.product.slug=slugify(req.body.product.title)
        const createProduct= await new productModel(req.body.product).save()
        return res.json(createProduct)
        
    } catch (err) {
        console.log("Product error",err.message);
        res.status(400).json({
            err:err.message
        })
    }
}
exports.read=async(req,res)=>{
    try {
        const readProducts=await productModel.find({})
        res.json(readProducts)
    } catch (error) {
        console.log("product read error",error.message);        
    }
}

