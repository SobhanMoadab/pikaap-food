const {default: mongoose} = require("mongoose")
const {ErrorHandler} = require("../Handler")
const {StatusCodes} = require("../Values")

class OrderValidator {

    async validateCreateOrder({restaurantId}) {
        if (!restaurantId || !mongoose.isValidObjectId(restaurantId)) throw new ErrorHandler({
            httpCode: 400,
            statusCode: StatusCodes.ERROR_PARAM,
            result: 'Param error'
        })
    }

    async validatePageQuery(page) {

        if (typeof page !== 'number') throw new ErrorHandler({
            statusCode: StatusCodes.ERROR_PARAM,
            httpCode: 400,
            result: 'Query param error'
        })

    }

    async isValidMongoose(id) {

        if (!mongoose.isValidObjectId(id)) throw new ErrorHandler({
            statusCode: StatusCodes.ERROR_PARAM,
            httpCode: 400,
            result: 'Query param error'
        })
    }

    async validateGetOrderByTrackingCode({trackingCode}) {
        if (!trackingCode) throw new ErrorHandler({
            statusCode: StatusCodes.ERROR_PARAM,
            httpCode: 400,
            result: 'Query param error'
        })
    }

}

module.exports = new OrderValidator()