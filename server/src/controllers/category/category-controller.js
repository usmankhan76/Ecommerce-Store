const categoryModel = require("../../models/category-model");
const slugify=require('slugify');
const subCategoryModel = require("../../models/sub-category-model");

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
    return  res.json(await categoryModel.find({}).sort({createdAt:-1}).exec())
}

exports.read=async(req,res)=>{
    console.log("read slug",req.params.slug)
    const category=await categoryModel.findOne({slug:req.params.slug}).exec()
    res.json(category)

}

exports.update=async (req,res)=>{
    try {
        const {category}=req.body;
        console.log("update",category,req.params.slug)
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
    const removedCategory=await categoryModel.findOneAndDelete({slug:req.params.slug});
    res.json(removedCategory) 

}

exports.getSubCategoryFromParent=(req,res)=>{
    
    return  subCategoryModel.find({parent:req.params._id}).exec((err,subs)=>{
        if(err) console.log(err);
        console.log("parent Subs",subs);
        res.json(subs)
    })
}