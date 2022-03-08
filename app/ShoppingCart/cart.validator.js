const mongoose = require('mongoose')
class CartValidator {

    async isValidMongoose(id) {

        if (!mongoose.isValidObjectId(id)) throw new ErrorHandler({ statusCode: StatusCodes.ERROR_PARAM, httpCode: 400 })
    }
}

module.exports = new CartValidator()