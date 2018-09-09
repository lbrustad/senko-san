const mongoose = require('mongoose');



module.exports = mongoose.model('Guild', new mongoose.Schema({
    guild: {
        type: String,
        required: true,
    },
    prefix: {
        type: String,
        default: "sk-"
    }
}))