const express = require('express');
const { creatUpdateUser, getCurrentUser } = require('../controllers/auth/auth-controller');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth-middle');
const authRoutes=express.Router();

authRoutes.post('/create-update-user',authMiddleware,creatUpdateUser)
authRoutes.post('/current-user',authMiddleware,getCurrentUser)
authRoutes.post('/admin',authMiddleware,adminMiddleware,getCurrentUser)
module.exports=authRoutes
