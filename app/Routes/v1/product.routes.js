const express = require("express")
const { ProductController } = require("../../Product")

const router = express.Router()
const use = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

router.post("/", use(ProductController.createProduct.bind(ProductController)))
router.put("/:productId", use(ProductController.updateProduct.bind(ProductController)))
router.get("/", use(ProductController.getProducts.bind(ProductController)))
router.get("/:productId", use(ProductController.getProductById.bind(ProductController)))
router.delete("/:productId", use(ProductController.deleteProduct.bind(ProductController)))

module.exports = router
