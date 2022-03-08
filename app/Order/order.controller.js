const OrderService = require('./order.service')

class OrderController {

    constructor(orderService) {
        this.orderService = orderService
    }
    
}

module.exports = new OrderController(OrderService)