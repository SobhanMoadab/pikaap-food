const express = require("express")
const { CategoryController } = require("../../Category")

const router = express.Router()
const use = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

router.post("/", use(CategoryController.createCategory.bind(CategoryController)))
router.put("/:categoryId", use(CategoryController.updateCategory.bind(CategoryController)))
router.get("/", use(CategoryController.getCategories.bind(CategoryController)))
router.get("/:categoryId", use(CategoryController.getCategoryById.bind(CategoryController)))
router.delete("/:categoryId", use(CategoryController.deleteCategory.bind(CategoryController)))

module.exports = router
