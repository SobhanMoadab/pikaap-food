const express = require("express")
const { CartController } = require("../../ShoppingCart")
const { UserMiddleware } = require('../../Middleware')

const router = express.Router()
const use = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

router.post("/add/:productId", UserMiddleware.auth, use(CartController.addToCart.bind(CartController)))
router.post("/remove/:productId", UserMiddleware.auth, use(CartController.removeItem.bind(CartController)))
router.post("/reduce/:productId", UserMiddleware.auth, use(CartController.reduceItemFromCart.bind(CartController)))
router.get("/", UserMiddleware.auth, use(CartController.getCart.bind(CartController)))



module.exports = router
