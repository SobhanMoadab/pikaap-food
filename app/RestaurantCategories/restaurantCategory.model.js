const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const RestaurantCategory = new mongoose.Schema({
    name: { type: String }
}, { timestamps: true })
module.exports = mongoose.model('RestaurantCategory', RestaurantCategory)
