// const SubCategoryModel = require("../../models/category-model");
const slugify=require('slugify');
const productModel = require('../../models/product-model');
const subCategoryModel = require('../../models/sub-category-model');
// const subCategoryModel = require('../../models/sub-category-model');

exports.create=async (req,res)=>{
    try {
        ;
          const {subCategory,parentCategory}=req.body;
          const name=subCategory;
        
    const createSubCategory= await new subCategoryModel({
        parent:parentCategory,
        name,
        slug:slugify(name,{lower:true})
    }).save();
    return res.json(createSubCategory)

    } catch (error) {
        res.status(400).send(error.message)
        // res.send({error:error.message})
       
    }

    

}

exports.list=async (req,res)=>{
    return  res.json(await subCategoryModel.find({}).sort({createdAt:-1}).exec())
}

exports.read=async(req,res)=>{
    console.log("read slug",req.params.slug)
    const Subategory=await subCategoryModel.findOne({slug:req.params.slug}).exec()
   const findProducts= await productModel.find({subs:Subategory}).populate("category").exec()
    res.json({Subategory,findProducts})

}

exports.update=async (req,res)=>{
    try {
        const {subCategory,parent}=req.body;
        console.log("update",subCategory,req.params.slug)
        const update=await subCategoryModel.findOneAndUpdate(
            {slug:req.params.slug},
            {name:subCategory,parent,slug:slugify(subCategory)},
            {new:true} // it will send the upadated data in response
            )
        res.json(update)
    } catch (error) {
        console.log(error.message)
    }

}

exports.remove=async(req,res)=>{
    const removedSubCategory=await subCategoryModel.findOneAndDelete({slug:req.params.slug});
    res.json(removedSubCategory) 

}