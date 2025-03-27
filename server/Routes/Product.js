const express = require('express')
const router = express.Router()


const { list ,read, post , put , remove  } =require('../Controllers/product')
const { verifykey } =require('../Middleware/checkkey')

router.get('/product',verifykey,read)

router.get('/product/:id',list)

router.post('/product',post)

router.put('/product/:id',put)

router.delete('/product/:id',remove)





module.exports = router