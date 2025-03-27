const mongoose = require('mongoose')

const LogoSchema = mongoose.Schema({

    nameth:{
        type: String
    },
    nameen:{
        type: String
    },
    icon:{
        type: String
    },
    path:{
        type: String
    }

})

module.exports = mongoose.model('logo',LogoSchema)