const mongoose = require('mongoose')

const SubmenuSchema = mongoose.Schema({
    name:{
        type: String
    },
    path:{
        type: String
    }
})

const childrensSchema = mongoose.Schema({
    name:{
        type: String
    },
    icon:{
        type: String
    },
    patch:{
        type: String
    },
    submenu:[SubmenuSchema]
})

const MenuSchema = mongoose.Schema({

    name:{
        type: String
    },
    icon:{
        type: String
    },
    patch:{
        type: String
    },
    childrens:[childrensSchema]
})




module.exports = mongoose.model('menu',MenuSchema)