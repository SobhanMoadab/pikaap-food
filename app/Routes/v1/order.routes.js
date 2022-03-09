const express = require("express")
const { OrderController } = require("../../Order")
const { UserMiddleware } = require('../../Middleware')

const router = express.Router()
const use = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

router.post("/create", UserMiddleware.auth, use(OrderController.createOrder.bind(OrderController)))
router.get("/restaurant-list", use(OrderController.getOrdersByRestaurant.bind(OrderController)))
// router.post("/remove/:productId", use(OrderController.removeItem.bind(OrderController)))
// router.post("/reduce/:productId", use(OrderController.reduceItemFromCart.bind(OrderController)))



module.exports = router
