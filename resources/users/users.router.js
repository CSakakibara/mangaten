const Router = require('express').Router
const router = Router();

const {protect} = require('../../auth')

const controller = require('./user.controller')

router.route('/')
    .get(controller.getMany)

router.route('/:id')
    .get(controller.getOne)
    .delete(controller.removeOne)

module.exports = router