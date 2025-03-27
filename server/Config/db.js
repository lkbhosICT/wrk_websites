const { default: mongoose } = require('mongoose')
require('dotenv').config()
const MONGO_URI = process.env.MONGO_URI;
const connectDB = async()=>{
    try{
        await mongoose.connect(MONGO_URI)
        console.log('DB Connected')
    }catch(err){
        console.log(err)
    }
}

module.exports = connectDB