const express = require('express');
const { createCoupon, listCoupons, deleteCoupon,applyCoupon } = require('../controllers/coupon/coupon-controller');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth-middle');
const coupenRoutes=express.Router()

coupenRoutes.post('/coupon',authMiddleware,adminMiddleware,createCoupon);
coupenRoutes.get('/coupons',listCoupons);
coupenRoutes.delete('/coupon/:couponId',authMiddleware,adminMiddleware,deleteCoupon);
coupenRoutes.post('/apply-coupon',authMiddleware,applyCoupon);

module.exports=coupenRoutes