const banner = require('../Models/Banner')

exports.read = async (req, res) => {
    try{
        const bannerData = await banner.findOne({},{_id:0, "imgbanner._id":0}).exec()

        if(!bannerData) return res.status(404).json({ message: "Banner not found" });

        res.json(bannerData)

    }catch (err){

        res.status(500).json({ message: "Server Error", error: err.message });
        
    }
}