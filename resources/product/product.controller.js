const makeCrudController = require('../../utils/crud')

const ProductModel = require('./product.model')

const controller = makeCrudController(ProductModel)

module.exports = controller
