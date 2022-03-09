const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const Order = new mongoose.Schema({
    restaurantId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    customerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    products: [{
        _id: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
        name: {type: String},
        fee: {type: Number},
        qty: {type: Number}
    }],
    trackingCode: {type: String},
    foodsPrice: {type: Number, default: 0},
    delivaryPrice: {type: Number, default: 0},
    packagingPrice: {type: Number, default: 0},
    totalPrice: {type: Number},

}, {timestamps: true})
Order.plugin(mongoosePaginate);
module.exports = mongoose.model('Order', Order)

