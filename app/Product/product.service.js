const ProductRepository = require('./product.repository')

class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository
    }

    async createProduct({name, recipe, fee, category}) {

        return await this.productRepository.createProduct({name, category, recipe, fee})
    }

    async updateProduct({productId, name, categoryId, recipe, fee}) {

        return await this.productRepository.updateProduct({productId, name, categoryId, recipe, fee})

    }

    async getProducts({page}) {

        return await this.productRepository.getProducts({page})

    }

    async deleteProduct({productId}) {

        await this.productRepository.deleteProduct({productId})

    }

    async getById({productId}) {

        return await this.productRepository.getById({productId})
    }

    async toggleDisable({productId}) {
        await this.productRepository.toggleDisable({productId})
    }

}

module.exports = new ProductService(ProductRepository)