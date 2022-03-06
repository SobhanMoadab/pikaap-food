const CategoryService = require('./category.service')
const CategoryValidator = require('./category.validator')
const { ResponseHandler, ErrorHandler } = require('../Handler')
const { StatusCodes } = require('../Values')

class CategoryController {

    constructor(categoryService, categoryValidator) {
        this.categoryService = categoryService
        this.categoryValidator = categoryValidator
    }

    async createCategory(req, res) {

        const { name } = req.body

        await this.categoryValidator.validateCreateCategory(req.body)
        await this.categoryService.createCategory({ name })

        return ResponseHandler.send({ res, httpCode: 201, statusCode: StatusCodes.RESPONSE_SUCCESSFUL, result: 'Category created' })
    }

    async updateCategory(req, res) {

        const { name } = req.body
        const { categoryId } = req.params

        await this.categoryValidator.isValidMongoose(categoryId)
        // reused validateCreateCategory to not rewrite validation for "name"
        await this.categoryValidator.validateCreateCategory(req.body)
        const result = await this.categoryService.updateCategory({ categoryId, name })

        return ResponseHandler.send({ res, httpCode: 200, statusCode: StatusCodes.RESPONSE_SUCCESSFUL, result })
    }

    async getCategories(req, res) {

        const { page } = req.query

        await this.categoryValidator.validatePageQuery(page)
        const result = await this.categoryService.getCategories({ page })

        return ResponseHandler.send({ res, httpCode: 200, statusCode: StatusCodes.RESPONSE_SUCCESSFUL, result })
    }

    async deleteCategory(req, res) {

        const { categoryId } = req.params
        // validation
        await this.categoryValidator.isValidMongoose(categoryId)
        const result = await this.categoryService.getById({ categoryId })
        if (!result) throw new ErrorHandler({ statusCode: StatusCodes.ERROR_PARAM, httpCode: 400 })
        if (result.products.length > 0) throw new ErrorHandler({ statusCode: StatusCodes.ERROR_CATEGORY_HAS_CHILDS, httpCode: 400, result: 'Category has childs' })
        // delete operation
        else {
            await this.categoryService.deleteCategory({ categoryId })
            return ResponseHandler.send({ res, httpCode: 200, statusCode: StatusCodes.RESPONSE_SUCCESSFUL, result: 'Category deleted' })
        }
    }

    async getCategoryById(req, res) {

        const { categoryId } = req.params

        await this.categoryValidator.isValidMongoose(categoryId)
        const result = await this.categoryService.getById({ categoryId })

        if (!result) throw new ErrorHandler({ statusCode: StatusCodes.ERROR_NOT_FOUND, httpCode: 400 })
        else return ResponseHandler.send({ res, httpCode: 200, statusCode: StatusCodes.RESPONSE_SUCCESSFUL, result })
    }
}
module.exports = new CategoryController(CategoryService, CategoryValidator)