const OrderRepository = require('./order.repository')
class OrderService {

    constructor(orderRepository) {
        this.orderRepository = orderRepository
    }

    async createOrder({ cart, items, restaurantId, customerId }) {
        return await this.orderRepository.createOrder({ cart, items, restaurantId, customerId })
    }
    async getOrdersByRestaurant({page, restaurantId}){
        return await this.orderRepository.getOrdersByRestaurant({page, restaurantId})
    }
}

module.exports = new OrderService(OrderRepository)