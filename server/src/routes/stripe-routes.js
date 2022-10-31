const express = require('express');
const { createPaymentIntent } = require('../controllers/stripe/stripe-controller');
const { authMiddleware } = require('../middlewares/auth-middle');

const stripeRoutes =express.Router()

stripeRoutes.post('/stripe-payment-intenet',authMiddleware,createPaymentIntent)
module.exports=stripeRoutes