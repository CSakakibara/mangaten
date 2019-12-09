const makeCrudController = require('../../utils/crud')

const Product = require('./product.model')

const controller = makeCrudController(Product)

module.exports = controller
