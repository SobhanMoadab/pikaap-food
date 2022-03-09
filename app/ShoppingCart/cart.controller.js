const Cart = require('./cart.service')
const CartValidator = require('./cart.validator')
const {ProductService} = require('../Product')
const {ResponseHandler, ErrorHandler} = require('../Handler')
const {StatusCodes} = require('../Values')

class CartController {

    constructor(cartValidator, productService) {
        this.cartValidator = cartValidator
        this.productService = productService

    }

    async addToCart(req, res) {
        const {productId} = req.params
        const session = req.session.cart ? req.session.cart : {}
        await this.cartValidator.isValidMongoose(productId)
        const foundedProduct = await this.productService.getById({productId})
        if (!foundedProduct) throw new ErrorHandler({
            httpCode: 400,
            statusCode: StatusCodes.ERROR_PARAM,
            result: 'Could not find product'
        })
        const {name, discountedPrice, fee} = foundedProduct
        const product = {
            name: name,
            fee: discountedPrice ? discountedPrice : fee
        }
        const cart = new Cart(session)
        cart.add(product, productId)
        req.session.cart = cart
        return ResponseHandler.send({
            res,
            httpCode: 200,
            statusCode: StatusCodes.RESPONSE_SUCCESSFUL,
            result: 'Added to cart'
        })
    }

    async reduceItemFromCart(req, res) {
        const {productId} = req.params
        const session = req.session.cart ? req.session.cart : {}
        await this.cartValidator.isValidMongoose(productId)
        const foundedProduct = await this.productService.getById({productId})
        if (!foundedProduct) throw new ErrorHandler({
            httpCode: 400,
            statusCode: StatusCodes.ERROR_PARAM,
            result: 'Could not find product'
        })
        const cart = new Cart(session)
        cart.reduceByOne(productId)
        req.session.cart = cart
        return ResponseHandler.send({
            res,
            httpCode: 200,
            statusCode: StatusCodes.RESPONSE_SUCCESSFUL,
            result: 'Reduced from cart'
        })

    }

    async getCart(req, res) {
        const session = req.session.cart ? req.session.cart : {}
        const cart = new Cart(session)
        const shoppingCart = {
            items: cart.getItems(),
            totalQty: cart.totalQty,
            totalFee: cart.totalfee
        }
        if (!shoppingCart) throw new ErrorHandler({
            httpCode: 400,
            statusCode: StatusCodes.ERROR_INTERNAL,
            result: 'Something went wrong'
        })
        return ResponseHandler.send({
            res,
            httpCode: 200,
            statusCode: StatusCodes.RESPONSE_SUCCESSFUL,
            result: shoppingCart
        })

    }

    async removeItem(req, res) {
        const {productId} = req.params
        const session = req.session.cart ? req.session.cart : {}
        const cart = new Cart(session)
        cart.removeItem(productId)
        req.session.cart = cart
        return ResponseHandler.send({
            res,
            httpCode: 200,
            statusCode: StatusCodes.RESPONSE_SUCCESSFUL,
            result: 'Removed from cart'
        })

    }
}

module.exports = new CartController(CartValidator, ProductService)