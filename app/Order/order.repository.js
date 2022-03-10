const Order = require('./order.model')
const UtilService = require('../Utils/util.service')
const {Types} = require('mongoose')

class OrderRepository {
    constructor(utilService) {
        this.utilService = utilService
    }

    async createOrder({cart, items, restaurantId, customerId}) {
        console.log({cart})
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

    async getOrdersByRestaurant({page, restaurantId}) {
        let result
        page ? result = await Order.paginate({restaurantId}, {
            limit: 10,
            page,
        }) : result = await Order.find({restaurantId})
        return result
    }

    async countOrders({restaurantId}) {
        let end = new Date()
        const startLastDay = new Date(Date.now() - 86400000)
        const startLastWeek = new Date(Date.now() - 604800000)
        const startLastMonth = new Date(Date.now() - 18144000000)

        const result = await Order.aggregate([
            {$match: {restaurantId: Types.ObjectId(restaurantId)}},
            {
                $facet: {
                    "todayTotalCount": [
                        {
                            $match: {
                                "createdAt": {
                                    $gte: startLastDay,
                                    $lt: end
                                }
                            }
                        },
                        {$count: "count"}],
                    "todayTotalSell": [
                        {
                            $match: {
                                "createdAt": {
                                    $gte: startLastDay,
                                    $lt: end
                                }
                            }
                        }, {
                            $group: {
                                _id: "$_id", todayTotalSell: {$sum: "$foodsPrice"}
                            }
                        }],
                    "lastWeekTotalCount": [
                        {
                            $match: {
                                "createdAt": {
                                    $gte: startLastWeek,
                                    $lt: end
                                }
                            }
                        },
                        {$count: "count"}
                    ],
                    "lastWeekTotalSell": [
                        {
                            $match: {
                                "createdAt": {
                                    $gte: startLastWeek,
                                    $lt: end
                                }
                            }
                        }, {
                            $group: {
                                _id: "$_id", todayTotalSell: {$sum: "$foodsPrice"}
                            }
                        }
                    ],
                    "lastMonthTotalCount": [
                        {
                            $match: {
                                "createdAt": {
                                    $gte: startLastMonth,
                                    $lt: end
                                }
                            }
                        }, {$count: "count"}],
                    "lastMonthTotalSell": [
                        {
                            $match: {
                                "createdAt": {
                                    $gte: startLastMonth,
                                    $lt: end
                                }
                            }
                        }, {
                            $group: {
                                _id: "$_id", todayTotalSell: {$sum: "$foodsPrice"}

                            }
                        }
                    ]
                }
            }

        ])
        return result
    }

    async getOrderByTrackingCode({trackingCode}) {
        const result = await Order.findOne({trackingCode})
        return result
    }


}

module.exports = new OrderRepository(UtilService)