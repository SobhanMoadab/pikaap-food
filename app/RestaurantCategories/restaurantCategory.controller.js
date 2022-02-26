const RestaurantCategoryService = require('./restaurantCategory.service')
const ValidatorService = require('../RestaurantCategories/restaurantCategory.validator')
const { ResponseHandler, ErrorHandler } = require('../Handler')
const { StatusCodes } = require('../Values')

class RestaurantCategoryController {

    constructor(restaurantCategoryService, validatorService) {
        this.resCategoryService = restaurantCategoryService
        this.validatorService = validatorService
    }

    async createCategory(req, res) {

        const { name } = req.body

        await this.validatorService.validateCreateCategory(req.body)
        await this.resCategoryService.createCategory({ name })

        return ResponseHandler.send({ res, httpCode: 201, statusCode: StatusCodes.RESPONSE_SUCCESSFUL, result: 'Category created' })
    }

    async updateCategory(req, res) {

        const { categoryId, name } = req.body

        await this.validatorService.isValidMongoose(categoryId)
        // reused validateCreateCategory to not rewrite validation for "name"
        await this.validatorService.validateCreateCategory(req.body)
        const result = await this.resCategoryService.updateCategory({ categoryId, name })

        return ResponseHandler.send({ res, httpCode: 200, statusCode: StatusCodes.RESPONSE_SUCCESSFUL, result })
    }

    async getCategories(req, res) {

        const { page } = req.query

        await this.validatorService.validatePageQuery(page)
        const result = await this.resCategoryService.getCategories({ page })

        return ResponseHandler.send({ res, httpCode: 200, statusCode: StatusCodes.RESPONSE_SUCCESSFUL, result })
    }

    async deleteCategory(req, res) {

        const { categoryId } = req.body

        await this.validatorService.isValidMongoose(categoryId)
        const result = await this.resCategoryService.getById({ categoryId })

        if (!result) throw new ErrorHandler({ statusCode: StatusCodes.ERROR_PARAM, httpCode: 400 })
        
        else {
            await this.resCategoryService.deleteCategory({ categoryId })
            return ResponseHandler.send({ res, httpCode: 200, statusCode: StatusCodes.RESPONSE_SUCCESSFUL, result: 'Category deleted' })
        }
    }

    async getCategoryById(req, res) {

        const { categoryId } = req.params

        await this.validatorService.isValidMongoose(categoryId)
        const result = await this.resCategoryService.getById({ categoryId })

        if (!result) throw new ErrorHandler({ statusCode: StatusCodes.ERROR_PARAM, httpCode: 400 })
        else return ResponseHandler.send({ res, httpCode: 200, statusCode: StatusCodes.RESPONSE_SUCCESSFUL, result })
    }
}
module.exports = new RestaurantCategoryController(RestaurantCategoryService, ValidatorService)