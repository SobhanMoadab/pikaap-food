const { ErrorHandler } = require('../Handler')
const { StatusCodes } = require('../Values')
const mongoose = require('mongoose')

class RestaurantCategoryValidator {

    async validateCreateCategory({ name }) {
        if (typeof name !== 'string' || !name) throw new ErrorHandler({ statusCode: StatusCodes.ERROR_PARAM, httpCode: 400 })
    }

    async validatePageQuery(page) {

        if (page && typeof page !== 'number') throw new ErrorHandler({ statusCode: StatusCodes.ERROR_PARAM, httpCode: 400 })

    }
    async isValidMongoose(id) {

        if (!mongoose.isValidObjectId(id)) throw new ErrorHandler({ statusCode: StatusCodes.ERROR_PARAM, httpCode: 400 })
    }
    
}

module.exports = new RestaurantCategoryValidator()