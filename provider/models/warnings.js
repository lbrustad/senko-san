const mongoose = require('mongoose');



module.exports = new mongoose.Schema({
    guild: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    moderator: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        required: true,
    },
    reason: {
        type: String,
        default: "No reason provided"
    }
})