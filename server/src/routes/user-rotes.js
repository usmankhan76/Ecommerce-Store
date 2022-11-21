const express = require('express');
const { createOrder, getOrders, createCashOrder } = require('../controllers/order/order-controller');
const { user, userCart,getUserCart,emptyUserCart,saveAddress } = require('../controllers/user/user-controller');
const { getWishlist, addToWishlist, removeFromWishlist } = require('../controllers/wishlist/wishlist-controller');
const { authMiddleware } = require('../middlewares/auth-middle');
const authRoutes=express.Router();

authRoutes.get('/user',user)
authRoutes.post('/user/cart',authMiddleware,userCart)
authRoutes.get('/user/cart',authMiddleware,getUserCart)
authRoutes.delete('/user/cart',authMiddleware,emptyUserCart)
authRoutes.post('/user/address',authMiddleware,saveAddress)
authRoutes.post('/user/order',authMiddleware,createOrder)
authRoutes.post('/user/cash-order',authMiddleware,createCashOrder)
authRoutes.get('/user/orders',authMiddleware,getOrders)
authRoutes.get('/user/wishlist',authMiddleware,getWishlist)
authRoutes.post('/user/wishlist',authMiddleware,addToWishlist)
authRoutes.put('/user/wishlist/:productId',authMiddleware,removeFromWishlist)

module.exports=authRoutes
