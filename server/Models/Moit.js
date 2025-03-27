const mongoose = require('mongoose');

const submenuSchema = mongoose.Schema({
    nums: { type: Number, required: true },
    title: { type: String, required: true },
    make_by: { type: String },
    path: { type: String },
    pdfurl: { type: String },
    fc_year: { type: Number }, 
    count_view: { type: Number }, 
    count_download: { type: Number }, 
}, { timestamps: true });

const childrenSchema = mongoose.Schema({
    nums: { type: Number, required: true },
    title: { type: String, required: true },
    make_by: { type: String },
    path: { type: String },
    pdfurl: { type: String },
    check: { type: String }, 
    fc_year: { type: Number }, 
    count_view: { type: Number }, 
    count_download: { type: Number },
    subtitle: { type: [submenuSchema], default: [] } 
}, { timestamps: true });

const menuSchema = mongoose.Schema({
    nums: { type: Number, required: true },
    fc_year: { type: Number, required: true },
    title: { type: String, required: true },
    childrens: { type: [childrenSchema], default: [] } 
}, { timestamps: true });

module.exports = mongoose.model('moit', menuSchema);