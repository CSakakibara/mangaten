const Router = require('express').Router;
const router = Router();


// db
const { client, ObjectId } = require('../../db.js')

// auth
const { protect } = require('../../auth')

// controller
const controller = require('./product.controller')

// /product
router.route('/')
  .get(controller.getMany)
  .post(controller.createOne)

// /product/:id
router.route('/:id')
  .get(controller.getOne)
  .delete(controller.removeOne)

module.exports = router
