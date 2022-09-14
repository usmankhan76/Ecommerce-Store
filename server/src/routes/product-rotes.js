const express = require('express');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth-middle');
const { create, read } = require('../controllers/product/product-controller');
const authRoutes=express.Router();


authRoutes.post('/product',authMiddleware,adminMiddleware,create);
authRoutes.get('/products',read);

module.exports=authRoutes
