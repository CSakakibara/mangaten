// vendors
const Router = require('express').Router
const router = Router()

// auth
const { protect, protectAdmin } = require('../../utils/auth')

// controller
const controller = require('./product.controller')

// /products
router.route('/')
  .get(controller.getMany)
  .post(protect, protectAdmin, controller.createOne)

// /products/:id
router.route('/:id')
  .get(controller.getOne)
  .put(protect, protectAdmin, controller.updateOne)
  .delete(protect, protectAdmin, controller.removeOne)

module.exports = router
