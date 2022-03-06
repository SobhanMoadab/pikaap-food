const CategoryRepository = require('./category.repository')

class CategoryService {

    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository
    }

    async createCategory({ name }) {

        await this.categoryRepository.createCategory({ name })
    }

    async updateCategory({ categoryId, name }) {

        return await this.categoryRepository.updateCategory({ categoryId, name })

    }

    async getCategories({ page }) {

        return await this.categoryRepository.getCategories({ page })

    }

    async deleteCategory({ categoryId }) {

        await this.categoryRepository.deleteCategory({ categoryId })

    }

    async getById({ categoryId }) {

        return await this.categoryRepository.getById({ categoryId })
    }

    async updateCategoryProducts({ product }) {
        return await this.categoryRepository.updateCategoryProducts({ product })
    }

    async addProductToCategory({ categoryId, productData }) {
        return await this.categoryRepository.addProductToCategory({ categoryId, productData })
    }

    async removeProductFromCategory({categoryId, productId}){
         await this.categoryRepository.removeProductFromCategory({categoryId, productId})
    }
}

module.exports = new CategoryService(CategoryRepository)
