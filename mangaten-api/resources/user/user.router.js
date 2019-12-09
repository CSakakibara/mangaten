// vendors
const Router = require('express').Router
const router = Router()

// auth
const { protectAdmin } = require('../../utils/auth')

// controller
const controller = require('./user.controller')

// /users
router.get('/me', controller.getMe)
router.put('/me', controller.updateMe)
router.get('/', protectAdmin, controller.getMany)

module.exports = router
