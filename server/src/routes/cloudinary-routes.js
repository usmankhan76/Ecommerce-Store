const express = require('express');
const { upload, remove } = require('../controllers/cloudinary/cloudinary-controller');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth-middle');

const router=express.Router()

router.post('/uploadimages',authMiddleware,adminMiddleware,upload)
router.post('/removeimage',authMiddleware,adminMiddleware,remove)

module.exports=router