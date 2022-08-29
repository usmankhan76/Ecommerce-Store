const express = require('express');
const { user } = require('../controllers/user/user-controller');
const authRoutes=express.Router();

authRoutes.get('/user',user)

module.exports=authRoutes
