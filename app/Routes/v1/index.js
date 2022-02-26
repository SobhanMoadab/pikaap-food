const CategoryRoutes = require('./restaurant-category.routes')

const express = require('express')
const router = express.Router()

router.use('/restaurant-category', CategoryRoutes)

module.exports = router
