const express = require('express');
const { list, create, read, remove, update } = require('../controllers/category/category-controller');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth-middle');

const authRoutes=express.Router();


authRoutes.post('/category',authMiddleware,adminMiddleware,create)
authRoutes.get('/categories',list)
authRoutes.get('/category/:slug',read)
authRoutes.put('/category/:slug',authMiddleware,adminMiddleware,update)
authRoutes.delete('/category/:slug',authMiddleware,adminMiddleware,remove)

module.exports=authRoutes
