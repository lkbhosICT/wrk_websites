const ApiKey = require("../Models/ApiKey");
const verifyApiKey = require('../Config/checkkey')
exports.getkey = async (req,res)=>{
    try{
        verifyApiKey()
        const key = await ApiKey.findOne();
        if (!key) return res.status(404).json({ error: "API Key not found" });
        res.json({ apiKey: key.key });
    }catch(err){
        res.status(500).json({ error: "Failed to create API key" });
    }
}

