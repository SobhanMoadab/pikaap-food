const RestaurantCategoryRepository = require('./restaurantCategory.repository')

class RestaurantCategoryService {

    constructor(restaurantCategoryRepository) {
        this.resCategoryRepository = restaurantCategoryRepository
    }

    async createCategory({ name }) {

        await this.resCategoryRepository.createCategory({ name })
    }

    async updateCategory({ categoryId, name }) {

        return await this.resCategoryRepository.updateCategory({ categoryId, name })

    }

    async getCategories({ page }) {

        return await this.resCategoryRepository.getCategories({ page })

    }

    async deleteCategory({ categoryId }) {

        await this.resCategoryRepository.deleteCategory({ categoryId })

    }

    async getById({ categoryId }) {

        return await this.resCategoryRepository.getById({ categoryId })
    }
}

module.exports = new RestaurantCategoryService(RestaurantCategoryRepository)