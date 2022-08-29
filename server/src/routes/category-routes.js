const express = require('express');
const { list, create, read, remove, update } = require('../controllers/category/category');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth-middle');

const categoryRoutes=express.Router();


categoryRoutes.post('/category',authMiddleware,adminMiddleware,create)
categoryRoutes.get('/categories',list)
categoryRoutes.post('/category:slug',authMiddleware,adminMiddleware,read)
categoryRoutes.put('/category:slug',authMiddleware,adminMiddleware,update)
categoryRoutes.delete('/category:slug',authMiddleware,adminMiddleware,remove)

module.exports=categoryRoutes
