
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
exports.productslist=async(req,res)=>{
    try {
        const readProducts=await productModel.find({})
        .limit(parseInt(req.params.count))
        .populate("category")
        .populate("subs")
        .sort([["createdAt","desc"]])
        .exec()
        res.json(readProducts)
    } catch (error) {
        console.log("product read error",error.message);        
    }
}

exports.remove=async(req,res)=>{
    try {
        
        const deleteProduct=await productModel.findOneAndRemove({slug:req.params.slug}).exec()
        res.json(deleteProduct)
    } catch (error) {
        console.log("product delete error",error.message);        
        return res.status(400).send("Product delet failed")
    }
}

exports.getProduct=async(req,res)=> {
    try {
        
        
        const getProduct= await  productModel.findOne({slug:req.params.slug})
        .populate('category')
        .populate('subs')
        .exec()
        return res.json(getProduct)
        
    } catch (err) {
        console.log(" get Product error",err.message);
        res.status(400).json({
            err:err.message
        })
    }
}
exports.update=async(req,res)=> {
    try {
        console.log("update",req.body);
        console.log("slug",req.body.product.title);
        if(req.body.product.title){

            req.body.slug=slugify(req.body.product.title);
        } 
        
        const updateProduct= await  productModel.findOneAndUpdate(
            {slug:req.params.slug},
            req.body.product,
            {new:true}// it is used to send ther recently updated version of the product in response
            )
        
        return res.json(updateProduct)
        
    } catch (err) {
        console.log(" update Product error",err.message);
        res.status(400).json({
            err:err.message
        })
    }
}
