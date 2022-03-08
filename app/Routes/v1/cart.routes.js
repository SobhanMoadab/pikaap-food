const express = require("express")
const { CartController } = require("../../ShoppingCart")

const router = express.Router()
const use = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

router.post("/add/:productId", use(CartController.addToCart.bind(CartController)))
router.post("/remove/:productId", use(CartController.removeItem.bind(CartController)))
router.post("/reduce/:productId", use(CartController.reduceItemFromCart.bind(CartController)))
router.get("/", use(CartController.getCart.bind(CartController)))




module.exports = router
