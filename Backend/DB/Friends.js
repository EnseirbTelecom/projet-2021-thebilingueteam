const mongoose = require('mongoose');

const friend = new mongoose.Schema({
    id_asker: {//the person who asked for 
        type: String
    },
    id_receiver: {
        type: String
    },
});

module.exports = Friend = mongoose.model('user', friend);