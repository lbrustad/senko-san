const mongoose = require('mongoose');



module.exports = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    like: {
        type: Number,
        default: 0
    },
    dislike: {
        type: Number,
        default: 0
    },
    tags: {
        type: Array,
        default: []
    },
    created_at: {
        type: String,
        required: true
    }
})