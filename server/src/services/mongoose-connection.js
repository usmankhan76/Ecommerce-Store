const mongoose = require('mongoose');
const  orderModal= require( '../models/order-modal');
const  cartModal=require( '../models/cart-modal');
const  categoryModel=require( '../models/category-model');
const  productModel=require( '../models/product-model');
const  subCategoryModel=require( '../models/sub-category-model');
const  userModel=require( '../models/user-model');
const coupenModal=require('../models/coupon-modal')

require('dotenv').config();



const connectToDatabase=async(uri)=>{
     return await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
}

const migrateModelData=async(localModel,atlasModel)=>{
    try {
        //first conncet to locall DB
        await connectToDatabase(process.env.DEV_DB_URI)

        //get the local Data from from local Model
        const localData=await localModel.find().lean();

        //before connecting to other DB first we should revoked the first connection
        mongoose.connection.close()
        //connect to atlas
        await connectToDatabase(process.env.PROD_DB_URI);

        //delete the old data in atlas model because every we need to push updated data and delete old data
        await atlasModel.deleteMany({});

        //push the local data
        await atlasModel.insertMany(localData)

        mongoose.connection.close()

        console.log(`Data migration successful for model: ${localModel.modelName}`);

    } catch (error) {
         console.error(`Error performing data migration for model: ${localModel.modelName}`, error.message);
  
    }
}


 const performMigration=async()=>{
    await migrateModelData(productModel,productModel);
    await migrateModelData(categoryModel,categoryModel);
    await migrateModelData(coupenModal,coupenModal);
    await migrateModelData(subCategoryModel,subCategoryModel);
    // await migrateModelData(cartModal,cartModal);
    // await migrateModelData(userModel,userModel);  
    // await migrateModelData(orderModal,orderModal);// we will not change these 3 models becuase multiple use have different data and if new user is registered in our atlas DB so it wiill delete which don't want

    //close the mongoose connections after all the modela are migrated

    await mongoose.connection.close();
    
}

module.exports={
    performMigration
}