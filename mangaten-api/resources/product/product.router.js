// vendors
const Router = require('express').Router
const router = Router()

// auth
const { protect, protectAdmin } = require('../../utils/auth')

//
const upload = require('../../utils/upload')

// controller
const controller = require('./product.controller')

// /products
router.route('/')
  .get(controller.getMany)
  .post(protect, protectAdmin, upload.single('image'), controller.createOne)

// /products/:id
router.route('/:id')
  .get(controller.getOne)
  .put(protect, protectAdmin, controller.updateOne)
  .delete(protect, protectAdmin, controller.removeOne)

module.exports = router
