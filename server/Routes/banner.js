const express = require('express')
const router = express.Router()

const { read } = require('../Controllers/banner')
const { verifykey } =require('../Middleware/checkkey')


router.get('/banner',verifykey,read)

module.exports = router