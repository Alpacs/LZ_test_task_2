const Router = require('express')
const { json } = require('express/lib/response')
const UserRouter = new Router()

const userController = require('../controller/user.controller')

UserRouter.post('/addPerson', userController.addPerson);
UserRouter.get('/getPDF',userController.getPDF)
UserRouter.get('/deleteUsers', userController.deleteUsers)

module.exports = UserRouter