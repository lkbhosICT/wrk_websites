const express = require('express')
const route = express.Router()

const {read} = require('../Controllers/logo')

const { verifykey } =require('../Middleware/checkkey')


route.get('/logo',verifykey,read)





module.exports = route