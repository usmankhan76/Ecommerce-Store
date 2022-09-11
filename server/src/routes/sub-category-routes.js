const express = require('express');
const { list, create, read, remove, update } = require('../controllers/sub-category/sub-category-controller');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth-middle');

const authRoutes=express.Router();


authRoutes.post('/subCategory',authMiddleware,adminMiddleware,create)
authRoutes.get('/subCategories',list)
authRoutes.get('/subCategory/:slug',read)
authRoutes.put('/subCategory/:slug',authMiddleware,adminMiddleware,update)
authRoutes.delete('/subCategory/:slug',authMiddleware,adminMiddleware,remove)

module.exports=authRoutes
