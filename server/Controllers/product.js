const product = require('../Models/Product')

exports.list = async (req,res) => {
    const token = req.cookies.authToken;
    console.log(token)
}

exports.read = async (req, res) => {
   try{
    const items = await product.find()
    res.send(items)
   }catch(err){
     res.staus(500).send('Server error')
   }
}

exports.post = async (req, res) => {
    try{

        console.log(req.body)
        const producted = await product(req.body).save()
        res.send(producted)

    }catch(err){
        console.log(err)
        res.staus(500).send('Server error')
    }
}

exports.put = async (req, res) => {
    res.send("Hello Controller Update")
}

exports.remove = async (req, res) => {
    res.send("Hello Controller Delete")
}
