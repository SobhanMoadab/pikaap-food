const CategoryRoutes = require('./category.routes')
const ProductRoutes = require('./product.routes')

const express = require('express')

const router = express.Router()

router.use('/category', CategoryRoutes)
router.use('/product', ProductRoutes)

module.exports = router
