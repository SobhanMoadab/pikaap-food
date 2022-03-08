const CategoryRoutes = require('./category.routes')
const ProductRoutes = require('./product.routes')
const ShoppingCartRoutes = require('./cart.routes')

const express = require('express')

const router = express.Router()

router.use('/category', CategoryRoutes)
router.use('/product', ProductRoutes)
router.use('/cart', ShoppingCartRoutes)

module.exports = router
