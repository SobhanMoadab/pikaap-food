const mongoose = require('mongoose')
// import mongoosePaginate from 'mongoose-paginate-v2'

const Product = new mongoose.Schema({
    name: { type: String },
    category: {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
        name: { type: String }
    },
    recipe: { type: String },
    fee: { type: Number, required: true },
    discountedFee: { type: Number },
    image: {
        path: { type: String }
    },
    comments: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('Product', Product)
