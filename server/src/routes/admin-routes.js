const express = require('express');
const { showOrders, updateOrderStatus } = require('../controllers/admin/admin-controller');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth-middle');
const adminRoutes=express.Router()

adminRoutes.get('/admin/orders',authMiddleware,adminMiddleware,showOrders)
adminRoutes.post('/admin/order-status',authMiddleware,adminMiddleware,updateOrderStatus)

module.exports=adminRoutes
