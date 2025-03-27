const express = require('express')
const route = express.Router()

route.get('/convert', async(req,res)=>{
    res.send("Hello")
})



module.exports = route