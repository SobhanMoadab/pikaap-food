const express = require("express")
const { resCategoriesController } = require("../../RestaurantCategories")
const router = express.Router()

const use = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

router.post("/", use(resCategoriesController.createCategory.bind(resCategoriesController)))
router.put("/", use(resCategoriesController.updateCategory.bind(resCategoriesController)))
router.get("/", use(resCategoriesController.getCategories.bind(resCategoriesController)))
router.get("/:categoryId", use(resCategoriesController.getCategoryById.bind(resCategoriesController)))
router.delete("/", use(resCategoriesController.deleteCategory.bind(resCategoriesController)))

module.exports = router
