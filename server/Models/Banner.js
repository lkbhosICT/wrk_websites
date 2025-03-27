const mongoose = require('mongoose')


const imgbannerSchema = mongoose.Schema({
    name:{
        type:String
    },
    path:{
        type:String
    }
},{ timestamps: true })

const bannerSchema = mongoose.Schema({

    wellcome:{
        type:String
    },
    hosname:{
        type:String
    },
    location:{
        type:String
    },
    title:{
        type:String
    },
    vision:{
        type:String
    },
    imgbanner: [imgbannerSchema]
},{ timestamps: true })

module.exports = mongoose.model('banner',bannerSchema)