const express = require('express')
const route = express.Router()
const {GetFileurl} = require('../Controllers/files')

route.get('/files/:filename',GetFileurl)


module.exports = route