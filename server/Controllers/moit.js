const moit = require('../Models/Moit')
const mongoose = require("mongoose");

exports.read = async (req,res) => {
    try{
        const year = parseInt(req.params.year, 10); 
        if (isNaN(year)) {
            return res.status(400).json({ error: "Invalid year parameter" });
        }
        const query = { fc_year: year };
        const moitlist = await moit.find(query)
        .select({_id:0,"createdAt": 0, "updatedAt": 0,"__v":0,
        "childrens.updatedAt":0,"childrens.createdAt":0,
        "childrens.__v":0, "childrens.subtitle.updatedAt": 0,"childrens.subtitle.createdAt": 0})
        .sort({nums:1})
        .lean()  
        .exec()

        if (Array.isArray(moitlist) && moitlist.length === 0) {
            return res.status(404).json({ error: "Data Not Found!" });
        }

        res.status(200).json(moitlist);
        
    }catch(err){
        res.status(500).send('Server Errors !!')
    }
}

exports.list = async(req,res) => {
    
    try {
        const id = req.params.id;
        const year = parseInt(req.params.year, 10);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        if (isNaN(year)) {
            return res.status(400).json({ error: "Invalid year parameter" });
        }

        const subtitleId = new mongoose.Types.ObjectId(id);

        const result = await moit.aggregate([
            { $match: { "fc_year": year } },
            {
                $facet: {
                    subtitles: [
                        { $unwind: "$childrens" },
                        { $unwind: "$childrens.subtitle" },
                        { $match: { "childrens.subtitle._id": subtitleId } },
                        {
                            $project: {
                                'childrens.subtitle._id': 1,
                                'childrens.subtitle.nums': 1,
                                'childrens.subtitle.title': 1,
                                'childrens.subtitle.path': 1,
                                'childrens.subtitle.pdfurl': 1,
                                'childrens.subtitle.fc_year': 1,
                                'childrens.subtitle.make_by': 1,
                                'childrens.subtitle.count_view': 1,
                                'childrens.subtitle.count_download': 1,
                                'childrens.nums': 1,
                                'nums':1,
                                'fc_year':1,
                                '_id': 0
                            }
                        }
                    ],
                    childrens: [
                        { $unwind: "$childrens" },
                        { $match: { "childrens._id": subtitleId } },
                        {
                            $project: {
                                'childrens._id': 1,
                                'childrens.nums': 1,
                                'childrens.title': 1,
                                'childrens.path': 1,
                                'childrens.pdfurl': 1,
                                'childrens.fc_year': 1,
                                'childrens.make_by': 1,
                                'childrens.count_view': 1,
                                'childrens.count_download': 1,
                                'nums':1,
                                'fc_year':1,
                                '_id': 0
                            }
                        }
                    ]
                }
            }
        ]);

        
        const finalResult = [...result[0].subtitles, ...result[0].childrens];

        if (finalResult.length === 0) {
            return res.status(404).json({ message: "No data found" });
        }

        res.status(200).json(finalResult);

    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
}

exports.putview = async(req, res)=>{
    const { id } = req.params;
    const subtitleId = new mongoose.Types.ObjectId(id);
    try {
        let result;
        result = await moit.updateOne(
            { "childrens._id": subtitleId, "childrens.count_view": { $type: "string" } },
            { $set: { "childrens.$.count_view": 0 } }
        );

        if (result.matchedCount === 0) {
            result = await moit.updateOne(
                { "childrens.subtitle._id": subtitleId, "childrens.subtitle.count_view": { $type: "string" } },
                { $set: { "childrens.$[].subtitle.$[sub].count_view": 0 } },
                { arrayFilters: [{ "sub._id": subtitleId }] }
            );
        }

        result = await moit.updateOne(
            { "childrens._id": subtitleId },
            { $inc: { "childrens.$.count_view": 1 } }
        );

        if (result.matchedCount === 0) {
            result = await moit.updateOne(
                { "childrens.subtitle._id": subtitleId },
                { $inc: { "childrens.$[].subtitle.$[sub].count_view": 1 } },
                { arrayFilters: [{ "sub._id": subtitleId }] }
            );
        }

        if (result.modifiedCount > 0) {
            res.json({ success: true, message: "Updated count_view successfully", result });
        } else {
            res.status(404).json({ success: false, message: "ID not found in childrens or subtitle" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


exports.putDownload = async(req, res)=>{
    const { id } = req.params;
    const subtitleId = new mongoose.Types.ObjectId(id);
    try {
        let result;
        result = await moit.updateOne(
            { "childrens._id": subtitleId, "childrens.count_download": { $type: "string" } },
            { $set: { "childrens.$.count_download": 0 } }
        );

        if (result.matchedCount === 0) {
            result = await moit.updateOne(
                { "childrens.subtitle._id": subtitleId, "childrens.subtitle.count_download": { $type: "string" } },
                { $set: { "childrens.$[].subtitle.$[sub].count_download": 0 } },
                { arrayFilters: [{ "sub._id": subtitleId }] }
            );
        }

        result = await moit.updateOne(
            { "childrens._id": subtitleId },
            { $inc: { "childrens.$.count_download": 1 } }
        );

        if (result.matchedCount === 0) {
            result = await moit.updateOne(
                { "childrens.subtitle._id": subtitleId },
                { $inc: { "childrens.$[].subtitle.$[sub].count_download": 1 } },
                { arrayFilters: [{ "sub._id": subtitleId }] }
            );
        }

        if (result.modifiedCount > 0) {
            res.json({ success: true, message: "Updated count_download successfully", result });
        } else {
            res.status(404).json({ success: false, message: "ID not found in childrens or subtitle" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.convert = async (req, res) => {
    res.send("hello Convert")
};


