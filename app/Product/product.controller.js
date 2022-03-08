const ProductService = require('./product.service')
const ProductValidator = require('./product.validator')
const CategoryService = require('../Category/category.service')

const { ResponseHandler, ErrorHandler } = require('../Handler')
const { StatusCodes } = require('../Values')

class ProductController {

    constructor(productService, productValidator, categoryService) {
        this.productService = productService
        this.productValidator = productValidator
        this.categoryService = categoryService
    }

    async createProduct(req, res) {

        const { name, categoryId, recipe, fee } = req.body

        // validate
        await this.productValidator.validateCreateProduct(req.body)
        const foundedCategory = await this.categoryService.getById({ categoryId })
        if (!foundedCategory) throw new ErrorHandler({ statusCode: StatusCodes.ERROR_NOT_FOUND, httpCode: 404, result: 'Failed to find category' })

        // create product
        const result = await this.productService.createProduct({ name, recipe, fee, category: { _id: foundedCategory._id, categoryName: foundedCategory.name } })
        if (!result) throw new ErrorHandler({ statusCode: StatusCodes.ERROR_INTERNAL, httpCode: 500 })

        // update category with product
        const data = { name, categoryId, recipe, fee, _id: result._id }
        await this.categoryService.addProductToCategory({ categoryId, productData: { ...data } })

        return ResponseHandler.send({ res, httpCode: 201, statusCode: StatusCodes.RESPONSE_SUCCESSFUL, result: 'Product created' })
    }

    async updateProduct(req, res) {

        const { name, recipe, fee } = req.body
        const { productId } = req.params

        // validate
        await this.productValidator.isValidMongoose(productId)

        const foundedProduct = await this.productService.getById({ productId })
        if (!foundedProduct) throw new ErrorHandler({ statusCode: StatusCodes.ERROR_NOT_FOUND, httpCode: 404 })

        const foundedCategory = await this.categoryService.getById({ categoryId: foundedProduct.category._id })
        if (!foundedCategory) throw new ErrorHandler({ statusCode: StatusCodes.ERROR_NOT_FOUND, httpCode: 404, result: 'Failed to find category' })

        // update product
        const result = await this.productService.updateProduct({ productId, name, categoryId: foundedCategory._id, recipe, fee })
        // pass updated values to category to sync its product data
        const product = {
            _id: result._id,
            name: result.name,
            fee: result.fee,
            recipe: result.recipe,
            categoryId: foundedCategory._id
        }
        await this.categoryService.updateCategoryProducts({ product })
        return ResponseHandler.send({ res, httpCode: 200, statusCode: StatusCodes.RESPONSE_SUCCESSFUL, result })
        // update category with new product
    }

    async getProducts(req, res) {

        const { page } = req.query

        await this.productValidator.validatePageQuery(page)
        const result = await this.productService.getProducts({ page })

        return ResponseHandler.send({ res, httpCode: 200, statusCode: StatusCodes.RESPONSE_SUCCESSFUL, result })
    }

    async deleteProduct(req, res) {

        const { productId } = req.params

        await this.productValidator.isValidMongoose(productId)
        const result = await this.productService.getById({ productId })

        if (!result) throw new ErrorHandler({ statusCode: StatusCodes.ERROR_NOT_FOUND, httpCode: 404 })

        else {
            await Promise.all([
                this.categoryService.removeProductFromCategory({ categoryId: result.category._id, productId: result._id }),
                this.productService.deleteProduct({ productId })
            ])
            return ResponseHandler.send({ res, httpCode: 200, statusCode: StatusCodes.RESPONSE_SUCCESSFUL, result: 'Product deleted' })
        }
    }

    async getProductById(req, res) {

        const { productId } = req.params

        await this.productValidator.isValidMongoose(productId)
        const result = await this.productService.getById({ productId })

        if (!result) throw new ErrorHandler({ statusCode: StatusCodes.ERROR_PARAM, httpCode: 400 })
        else return ResponseHandler.send({ res, httpCode: 200, statusCode: StatusCodes.RESPONSE_SUCCESSFUL, result })
    }
}

module.exports = new ProductController(ProductService, ProductValidator, CategoryService)