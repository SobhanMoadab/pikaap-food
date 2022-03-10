const OrderRepository = require('./order.repository')

class OrderService {

    constructor(orderRepository) {
        this.orderRepository = orderRepository
    }

    async createOrder({cart, items, restaurantId, customerId}) {
        return await this.orderRepository.createOrder({cart, items, restaurantId, customerId})
    }

    async getOrdersByRestaurant({page, restaurantId}) {
        return await this.orderRepository.getOrdersByRestaurant({page, restaurantId})
    }

    async countOrders({restaurantId}) {
        return await this.orderRepository.countOrders({restaurantId})
    }

    async getOrderByTrackingCode({trackingCode}) {
        return await this.orderRepository.getOrderByTrackingCode({trackingCode})
    }
}

module.exports = new OrderService(OrderRepository)