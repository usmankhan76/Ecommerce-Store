
const slugify=require('slugify')
const productModel = require('../../models/product-model')
const userModel = require('../../models/user-model')

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


exports.productsCount=async(req,res)=>{
    try {
        const allProductsCount=await productModel.find({}).estimatedDocumentCount().exec()
        res.json(allProductsCount)
    } catch (error) {
        console.log("getProductForPagination error",error.message);

    }
}
// exports.listProducts=async(req,res)=>{
//     try {
//         console.log("listProducts",req.body);
//         const {sort,order,limit}=req.body
//         const products=await productModel.find({})
//         .populate('category')
//         .populate('subs')
//         .sort([[sort,order]])//if we have more then one items then it will take two arrays and sort accordingly 
//         .limit(limit)
//         .exec()

//         return res.json(products)
//     } catch (error) {
        
//     }
// }
exports.listProducts=async(req,res)=>{
    try {

        console.log("listProducts",req.body);
        const {sort,order,page}=req.body
        const currentPage=page||1;
        const perPage=4
        const products=await productModel.find({})
        .skip((currentPage-1)*perPage) // this will show us the products in pages
        .populate('category')
        .populate('subs')
        .sort([[sort,order]])//if we have more then one items then it will take two arrays and sort accordingly 
        .limit(perPage)
        .exec()

        return res.json(products)
    } catch (error) {
        
    }
}
exports.productRating=async(req,res)=>{
    try {
        const{stars}=req.body
        console.table(req.body);
        // first we get the product by Id using use params
        const product=await productModel.findById(req.params.productId).exec() // we exec b/c it give product to product variable;

        // second we get the user   
        const {email}=req.userCredientials.firebaseUser
        const user=await userModel.findOne({email})  
        console.log("rating user",user);
        const userId=user && user._id  
        console.log("rating controller ID",userId);

        //third we check that the user have give rating or not

        const checkProductRatingObject=product && product.ratings.find((obj)=> (
            obj.postedBy.toString()===userId.toString()
            ))
        //if there is no rating then we push rating in the product rating model
        if(checkProductRatingObject==undefined){
           const addRatingToProduct= await productModel.findByIdAndUpdate(product._id,{
                $push:{ratings:{stars,postedBy:userId}}
            },
            {new:true}, // it is used to send newly updated data to the front end and use it when we update
            
            ).exec()
            console.log("rating added",addRatingToProduct)
            res.json(addRatingToProduct)

        }else{
            // if the user alread gave the rating then we only update the stars
            let ratingUpdated=await productModel.updateOne(
                {ratings:{$elemMatch:checkProductRatingObject}},// this will find the object in rating array in product model and also find the product
                {$set:{"ratings.$.stars":stars}},// this will set stars to star in rating array
                {new:true}
            ).exec()
             console.log("rating added",ratingUpdated)
            res.json(ratingUpdated)

        }


        
    } catch (error) {
        console.log("controller stars",error.message);
    }
}
exports.listRelatedProducts=async(req,res)=>{
    try {
        const findProduct=await productModel.findById(req.params.productId).exec();
        const relatedProducts=await productModel.find({
            _id:{$ne:findProduct._id},// $ne means not including this id object
            category:findProduct.category
        })
        .limit(4)
        .populate('category')
        .populate('subs')
        .exec()

        res.json((relatedProducts))
    } catch (error) {
        console.log("relate product error",error.message)
    }
}

const handleQuery=async(req,res,query)=>{
    const findProducts=await productModel.find({$text:{$search:query}})
    .populate('category','_id name')
    .populate('subs','_id name')
    .exec()

    res.json(findProducts)
}

const handlePrice=async(req,res,price)=>{
    try {
         const findProducts=await productModel.find({
        price:{
            $gte:price[0],//it show greater than price
            $lte:price[1]//  it show less than price
            }
        })
        .populate('category','_id name')
        .populate('subs','_id name')
        .exec()

        res.json(findProducts)

    } catch (error) {
        console.log("handlePrice error",error.message)
    }
   
}

exports.searchFilters=async(req,res)=>{
    try {
        const {query:{query,price}}=req.body
        console.log(query);
        if(query){
            await handleQuery(req,res,query)
        }
        if(price!==undefined){
            console.log('price',price)
            await handlePrice(req,res,price)
        }
        
    } catch (error) {
        console.log("search filter error",error.message)
        
    }
}

