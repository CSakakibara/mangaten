const Router = require('express').Router
const router = Router()

// controller
const controller = require('./product.controller')

// /product
router.route('/')
  .get(controller.getMany)
  .post(controller.createOne)

// /product/:id
router.route('/:id')
  .get(controller.getOne)
  .put(controller.updateOne)
  .delete(controller.removeOne)

module.exports = router
