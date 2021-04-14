const express = require('express');
const mongooose = require('mongoose');
const User = require('../DB/User');
const route = express.Router();

route.post('/', async (req,res) => {
    const {pseudo,mail,password} = req.body;
    let user = {};
    user.pseudo = pseudo;
    user.mail = mail;
    user.password = password;
    let userModel = new User(user);
    await userModel.save();
    res.json(userModel);
});





module.exports = route;