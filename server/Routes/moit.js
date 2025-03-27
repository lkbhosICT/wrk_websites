const express = require('express')
const route = express.Router()

const { read, list, putview, putDownload, convert } = require('../Controllers/moit')
const { verifykey } =require('../Middleware/checkkey')


route.get('/moit/:year',verifykey,read)

route.get('/moit/:year/:id',verifykey,list)

route.put('/moit/update-view/:id',verifykey,putview)

route.put('/moit/update-download/:id',verifykey,putDownload)

module.exports = route