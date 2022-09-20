const express = require('express');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth-middle');
const { create, productslist,remove, getProduct,update } = require('../controllers/product/product-controller');
const authRoutes=express.Router();


authRoutes.post('/product',authMiddleware,adminMiddleware,create);
authRoutes.get('/products/:count',productslist);
authRoutes.delete('/product/:slug',authMiddleware,adminMiddleware,remove);
authRoutes.put('/product/:slug',authMiddleware,adminMiddleware,update);
authRoutes.get('/product/:slug',getProduct);

module.exports=authRoutes
