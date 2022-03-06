const mongoose = require('mongoose')
// import mongoosePaginate from 'mongoose-paginate-v2'

const Category = new mongoose.Schema({
    name: { type: String },
    products: [{
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: { type: String, required: true },
        fee: { type: Number, required: true },
        recipe: { type: String, required: true },
        discountedFee: { type: Number }
    }]
}, { timestamps: true })

module.exports = mongoose.model('Category', Category)
