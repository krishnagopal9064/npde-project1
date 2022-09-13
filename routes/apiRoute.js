const express=require('express')
const Route=express.Router()
const apiController=require('../controller/apiController')
const userAuth = require('../middleware/userAuth')

Route.get('/', apiController.index)
Route.post('/register', [userAuth.checkDuplicateEntries], apiController.register)
Route.post('/login', apiController.login)

module.exports = Route;