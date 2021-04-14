const mongoose = require('mongoose');

const user = new mongoose.Schema({
    pseudo: {
        type: String
    },
    mail: {
        type: String
    },
    password: {
        type: String
    },
});

module.exports = User = mongoose.model('user', user);