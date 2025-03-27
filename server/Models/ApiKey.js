const mongoose = require('mongoose')

const apikeySchema = mongoose.Schema({
    key: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now }
})

apikeySchema.index({expiresAt: 1},{expireAfterSeconds: 0 })

module.exports = mongoose.model('apikey',apikeySchema)