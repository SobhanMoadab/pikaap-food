const Product = require('./product.model')

class ProductRepository {

    async createProduct({name, category, recipe, fee,}) {

        const {categoryName, _id} = category
        return await Product({name, category: {name: categoryName, _id}, recipe, fee}).save()
    }

    async updateProduct({productId, name, categoryId, recipe, fee}) {

        return await Product.findByIdAndUpdate(productId, {name, categoryId, recipe, fee}, {new: true})

    }

    async getProducts({page}) {

        let result
        page ? result = await Product.paginate({}, {limit: 10, page,}) : result = await Product.find()
        return result
    }

    async deleteProduct({productId}) {

        await Product.findByIdAndDelete(productId)
    }

    async getById({productId}) {

        const result = await Product.findById(productId)
        return result ? result : false
    }

    async toggleDisable({productId}) {

        await Product.findByIdAndUpdate(productId, [{
            $set: {
                isDisabled: {$not: "$isDisabled"}
            }
        }])
    }
}

module.exports = new ProductRepository()