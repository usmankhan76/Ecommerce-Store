const express = require('express');
const { user, userCart,getUserCart,emptyUserCart,saveAddress } = require('../controllers/user/user-controller');
const { authMiddleware } = require('../middlewares/auth-middle');
const authRoutes=express.Router();

authRoutes.get('/user',user)
authRoutes.post('/user/cart',authMiddleware,userCart)
authRoutes.get('/user/cart',authMiddleware,getUserCart)
authRoutes.delete('/user/cart',authMiddleware,emptyUserCart)
authRoutes.post('/user/address',authMiddleware,saveAddress)

module.exports=authRoutes
