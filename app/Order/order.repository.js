const Order = require('./order.model')
const UtilService = require('../Utils/util.service')
class OrderRepository {
    constructor(utilService) {
        this.utilService = utilService
    }
    async createOrder({ cart, items, restaurantId, customerId }) {
        const products = []
        Object.keys(items).forEach(key => {
            let productObject = {
                _id: key,
                qty: items[key]['qty'],
                fee: items[key]['fee']
            }
            products.push(productObject)
        })
        await Order({
            restaurantId,
            customerId,
            trackingCode: await this.utilService.uuidv4(),
            foodsPrice: cart.totalfee,
            products
        }).save()
    }

    async getOrdersByRestaurant({ page, restaurantId }) {
        console.log({page, restaurantId})
        let result
        page ? result = await Order.paginate({ restaurantId }, { limit: 10, page, }) : result = await Order.find({ restaurantId })
        return result
    }
}

module.exports = new OrderRepository(UtilService)