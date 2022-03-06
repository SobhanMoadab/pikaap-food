const Category = require('./category.model')

class CategoryRepository {


    async createCategory({ name }) {

        await Category({ name }).save()
    }

    async updateCategory({ categoryId, name }) {
        const result = await Category.findByIdAndUpdate(categoryId, { name }, { new: true })
        return result
    }

    async getCategories({ page }) {

        let result
        page ? result = await Category.paginate({}, { limit: 10, page, }) : result = await Category.find()
        return result
    }

    async deleteCategory({ categoryId }) {

        await Category.findByIdAndDelete(categoryId)
    }

    async getById({ categoryId }) {
        const result = await Category.findById(categoryId)
        return result ? result : false
    }

    async addProductToCategory({ categoryId, productData }) {

        await Category.findByIdAndUpdate(categoryId, {
            $push: { products: productData }
        })

    }

    async removeProductFromCategory({ categoryId, productId }) {

        await Category.findOneAndUpdate({
            "_id": categoryId,
            "products._id": productId
        }, {
            "$pull": {
                "products": { _id: productId }
            }
        })
    }

    async updateCategoryProducts({ product }) {
        const { name = null, fee = null, recipe = null, _id = null, categoryId = null } = product
        return await Category.findOneAndUpdate({
            "_id": categoryId,
            "products._id": _id
        }, {
            "$set": {
                "products.$.name": name,
                "products.$.fee": fee,
                "products.$.recipe": recipe,
            }
        }, { new: true })
    }
}

module.exports = new CategoryRepository()