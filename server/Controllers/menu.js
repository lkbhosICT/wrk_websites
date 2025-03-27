const menu = require('../Models/Menu')

exports.read = async (req , res ) =>{
    try{
        const readmenu = await menu.find({}, { _id: 0, "childrens._id": 0, "childrens.submenu._id": 0 }).exec();

        if(!readmenu) return res.status(401).json({ message: "Menu not found" });

        res.json(readmenu)
        
    }catch(err){
        res.status(500).json({ message: "Server Error", error: err.message })
    }
}