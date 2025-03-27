const express = require('express')
const route = express.Router()
const {read} = require('../Controllers/menu')
const { verifykey } =require('../Middleware/checkkey')

route.get('/menu',verifykey,read)




module.exports = route