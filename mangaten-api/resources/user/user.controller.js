const makeCrudController = require('../../utils/crud')

const UserModel = require('./user.model')

const controller = makeCrudController(UserModel)

module.exports = controller
