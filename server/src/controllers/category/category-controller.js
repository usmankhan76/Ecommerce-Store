const categoryModel = require("../../models/category-model");
const slugify=require('slugify');
const subCategoryModel = require("../../models/sub-category-model");
const productModel = require("../../models/product-model");

exports.create=async (req,res)=>{
    try {
        console.log("body",req.body);
          const {category}=req.body;
          const name=category;
        console.log("name",name);
    const createCategory= await new categoryModel({
        name,
        slug:slugify(name,{lower:true})
    }).save();
    return res.json(createCategory)

    } catch (error) {
        res.status(400).send(error.message)
        // res.send({error:error.message})
       
    }

    

}

exports.list=async (req,res)=>{
    try {
        res.header("Access-Control-Allow-Origin", "*");
        return  res.json(await categoryModel.find({}).sort({createdAt:-1}).exec())
        
    } catch (error) {
        res.status(400).send(error.message)
    }
}

exports.read=async(req,res)=>{
    try {
        
        const category=await categoryModel.findOne({slug:req.params.slug}).exec()
    
        const findProducts= await productModel.find({category}).populate("category").exec()
    
    
        res.json({findProducts,category})
    } catch (error) {
        
    }

}

exports.update=async (req,res)=>{
    try {
        const {category}=req.body;
        
        const update=await categoryModel.findOneAndUpdate(
            {slug:req.params.slug},
            {name:category,slug:slugify(category)},
            {new:true} // it will send the upadated data in response
            )
        res.json(update)
    } catch (error) {
        console.log(error)
    }

}

exports.remove=async(req,res)=>{
    try {
        const removedCategory=await categoryModel.findOneAndDelete({slug:req.params.slug});
        res.json(removedCategory) 
        
    } catch (error) {
                res.status(400).send(error.message)

    }

}

exports.getSubCategoryFromParent=async(req,res)=>{
    try {
        
        return await subCategoryModel.find({parent:req.params._id}).exec((err,subs)=>{
            if(err) console.log(err);
           
            res.json(subs)
        })
    } catch (error) {
                res.status(400).send(error.message)
    }
}