
require('dotenv').config();
const ApiKey = require("../Models/ApiKey");

exports.checkkey = async (req, res ,next) =>{
    try{
        const token = req.headers.authorization
        const secretToken = process.env.SECRET_TOKEN;
        const keyin = req.headers['lkbhos-api-key']

        console.log(keyin)
        
        if(!token) return res.status(401).send("No token !")
        if (!keyin) return res.status(401).json({ message: 'API key is missing' });
        if (token !== `Bearer ${secretToken}`) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        if (keyin !== 'Lkbh@11234!11234@!'){
            return res.status(403).json({ message: 'Invalid token' });
        }
        console.log(keyin)
        next()
    }catch(err){
        console.log(err)
        res.send('Server Errors').status(500)
    }
}

exports.verifykey = async (req ,res ,next) => {
        try{
            const authHeader = req.headers.authorization;
            if(!authHeader) return res.status(401)
            const token = authHeader ? authHeader.split(" ")[1] : null;
            
            const checktoken = await ApiKey.findOne({key : token})

            if(!checktoken) return res.status(401)

            next()
        }catch(err){
            console.log(err)
            res.send('Server Errors').status(500)
        }
}