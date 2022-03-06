const { ErrorHandler } = require('../Handler')
const { StatusCodes } = require('../Values')
const mongoose = require('mongoose')

class ProductValidator {

    async validateCreateProduct({ name, categoryId, recipe, fee }) {
        if (!name || typeof name !== 'string') {
            throw new ErrorHandler({ statusCode: StatusCodes.ERROR_PARAM, httpCode: 400 })
        }
        if (!categoryId || !mongoose.isValidObjectId(categoryId)) {
            throw new ErrorHandler({ statusCode: StatusCodes.ERROR_PARAM, httpCode: 400 })
        }
        if (!recipe || typeof recipe !== 'string') {
            throw new ErrorHandler({ statusCode: StatusCodes.ERROR_PARAM, httpCode: 400 })
        }
        if (!fee || typeof fee !== 'number') {
            throw new ErrorHandler({ statusCode: StatusCodes.ERROR_PARAM, httpCode: 400 })
        }
    }
    async validateUpdateProduct({ productId }) {
        console.log(productId)
        if (!mongoose.isValidObjectId(productId)) {
            throw new ErrorHandler({ statusCode: StatusCodes.ERROR_PARAM, httpCode: 400 })
        }
    }
    async validatePageQuery(page) {

        if (page && typeof page !== 'number') throw new ErrorHandler({ statusCode: StatusCodes.ERROR_PARAM, httpCode: 400 })

    }
    async isValidMongoose(id) {

        if (!mongoose.isValidObjectId(id)) throw new ErrorHandler({ statusCode: StatusCodes.ERROR_PARAM, httpCode: 400 })
    }
}
module.exports = new ProductValidator()