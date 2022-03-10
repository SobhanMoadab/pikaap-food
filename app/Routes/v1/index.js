const CategoryRoutes = require('./category.routes')
const ProductRoutes = require('./product.routes')
const ShoppingCartRoutes = require('./cart.routes')
const OrderRoutes = require('./order.routes')

const {UserMiddleware} = require('../../Middleware')

const express = require('express')
const router = express.Router()

router.use('/category', CategoryRoutes)
router.use('/product', ProductRoutes)
router.use('/cart', ShoppingCartRoutes)
router.use('/order', UserMiddleware.auth, OrderRoutes)
module.exports = router
