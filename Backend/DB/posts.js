const mongoose = require('mongoose');

const posts = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    
    userId: {
        type: String
    },
    date: {
        type: String
    },
    username: {
        type: String
    },
    userPP: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    imgsource: {
        type: String
    }
});

module.exports = Post = mongoose.model('posts', posts);