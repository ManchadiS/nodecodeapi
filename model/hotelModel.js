const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const hotelSchema = new Schema({
    name: {
        type: String
    },
    number: {
        type: String
    },
    email: {
        type: String,
        index: true
    },
    country: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    pincode: {
        type: String
    },
    address: {
        type: String
    }
}, { timestamps: true });
module.exports = mongoose.model('hotels', hotelSchema);


