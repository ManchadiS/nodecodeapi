const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ImageSchema = new Schema({
    imageLink: {
        type: String
    }
}, { timestamps: true });
module.exports = mongoose.model('images', ImageSchema);


