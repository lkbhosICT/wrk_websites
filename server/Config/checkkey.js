const ApiKey = require('../Models/ApiKey')
const { v4: uuidv4 } = require("uuid");



const verifyApiKey = async(req,res)=>{
    try{
        const key = await ApiKey.findOne()
        if(!key){
            const newKey = new ApiKey({
                        key: uuidv4(),
                        expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000) 
            });
            await newKey.save();
            console.log("Generate: "+newKey.key)
        }else{
            if (new Date(key.expiresAt).getTime() < Date.now()) {
                const newKey = new ApiKey({
                    key: uuidv4(),
                    expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000) 
                });
                await newKey.save();
                console.log("Generate: "+newKey.key)
            } else {
                console.log("Token is real :"+key.key); 
            }
        }
    }catch (err){
        console.log("ERRORS !")
    }
}
module.exports = verifyApiKey