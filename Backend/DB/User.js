const mongoose = require('mongoose');

const user = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    pseudo: {
        type: String
    },
    mail: {
        type: String
    },
    password: {
        type: String
    },
    description: {
        type: String
    },
    profilePicture: {
        data: Buffer,
        contentType: String
    }
});

module.exports = User = mongoose.model('user', user);