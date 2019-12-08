const Router = require('express').Router
const router = Router()

const controller = require('./user.controller')

router.route('/')
  .get(controller.getMany)

router.route('/:id')
  .get(controller.getOne)
  .put(controller.updateOne)
  .delete(controller.removeOne)

module.exports = router
