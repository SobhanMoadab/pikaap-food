const mongoose = require('mongoose')
// import mongoosePaginate from 'mongoose-paginate-v2'

const Order = new mongoose.Schema({
    products: [{
        productName: { type: String },
        count: { type: Number, default: 1 }
    }],
    customer: {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        customerName: { type: String }
    },
    restaurant: {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        restaurantName: { type: String }
    },
    totalFoodsPrice: { type: Number, default: 0 },
    delivaryFee: { type: Number, default: 0 },
    packagingFee: { type: Number, default: 0 }

}, { timestamps: true })

module.exports = mongoose.model('Order', Order)
