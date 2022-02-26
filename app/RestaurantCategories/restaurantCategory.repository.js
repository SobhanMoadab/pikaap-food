const RestaurantCategory = require('./restaurantCategory.model')

class RestaurantCategoryRepository {

    constructor(restaurantCategoryRepository) {
        this.resCategoryRepository = restaurantCategoryRepository
    }

    async createCategory({ name }) {

        await RestaurantCategory({ name }).save()
    }

    async updateCategory({ categoryId, name }) {

        const result = await RestaurantCategory.findByIdAndUpdate(categoryId, { name }, { new: true })
        return result
    }

    async getCategories({ page }) {

        let result
        page ? result = await RestaurantCategory.paginate({}, { limit: 10, page, }) : result = await RestaurantCategory.find()
        return result
    }

    async deleteCategory({ categoryId }) {

        await RestaurantCategory.findByIdAndDelete(categoryId)
    }
    
    async getById({categoryId}){
        
        const result = await RestaurantCategory.findById(categoryId)
        return result ? result : false
    }
}

module.exports = new RestaurantCategoryRepository()