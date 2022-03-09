const OrderService = require('./order.service')
const OrderValidator = require('./order.validator')
const Cart = require('../ShoppingCart/cart.service')
const { ErrorHandler, ResponseHandler } = require('../Handler')
const { StatusCodes } = require('../Values')
class OrderController {

    constructor(orderService, orderValidator) {
        this.orderService = orderService
        this.orderValidator = orderValidator
    }

    async createOrder(req, res) {
        if (!req.session.cart) throw new ErrorHandler({ httpCode: 400, statusCode: StatusCodes.ERROR_SESSION_NOT_FOUND, result: 'Session does not exists' })
        const { restaurantId } = req.body
        const session = req.session.cart
        const customerId = req.userId
        await this.orderValidator.validateCreateOrder(req.body)
        const cart = new Cart(session)
        const items = cart.getItems()
        await this.orderService.createOrder({ cart, items, restaurantId, customerId })
        return ResponseHandler.send({ res, httpCode: 200, statusCode: StatusCodes.RESPONSE_SUCCESSFUL, result: 'Successfully created order' })
        // result ? res.redirect('www.google.com') : new ErrorHandler({ httpCode: 500, statusCode: StatusCodes.ERROR_INTERNAL, result: 'Something went wrong' })
    }
    async getOrdersByRestaurant(req, res) {
        const { page, restaurantId } = req.query

        if (restaurantId) await this.orderValidator.isValidMongoose(restaurantId)
        if (page) await this.orderValidator.validatePageQuery(parseInt(page))

        const result = await this.orderService.getOrdersByRestaurant({ page, restaurantId })
        return ResponseHandler.send({ res, httpCode: 200, statusCode: StatusCodes.RESPONSE_SUCCESSFUL, result })

    }
}

module.exports = new OrderController(OrderService, OrderValidator)