const logo = require('../Models/Logo')

exports.read = async (req,res) => {
    try{
        const Readlogo = await logo.find({},{_id:0,__v:0}).exec()

        if(Readlogo < 1) return res.status(404).send("Don't have Data !")

        res.send(Readlogo)
    }catch(err){
        res.status(500).send('Server errors!')
    }
}


