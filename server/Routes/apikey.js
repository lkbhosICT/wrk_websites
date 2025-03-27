const express = require('express')

const router = express.Router()

const { getkey } = require("../Controllers/apikey");

const { checkkey } = require('../Middleware/checkkey')

router.get('/apikey',checkkey,getkey)




module.exports = router