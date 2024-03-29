const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String,
        index: true
    },
    mobile_number: {
        type: String
    }
}, { timestamps: true });
module.exports = mongoose.model('users', userSchema);


