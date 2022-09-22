const express = require('express');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth-middle');
const { create, productslist,remove, getProduct,update,listProducts,productsCount } = require('../controllers/product/product-controller');
const authRoutes=express.Router();


authRoutes.post('/product',authMiddleware,adminMiddleware,create);
authRoutes.get('/products/total',productsCount);
authRoutes.get('/products/:count',productslist);
authRoutes.delete('/product/:slug',authMiddleware,adminMiddleware,remove);
authRoutes.put('/product/:slug',authMiddleware,adminMiddleware,update);
authRoutes.get('/product/:slug',getProduct);
authRoutes.post('/products',listProducts);

module.exports=authRoutes
