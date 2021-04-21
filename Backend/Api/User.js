const express = require('express');
const mongooose = require('mongoose');
const User = require('../DB/User');
const route = express.Router();

route.get('/:pseudo', (req,res) => {
    const pseudo = req.params.pseudo;
    User.findOne({mail: pseudo})
    .exec()
    .then(doc => {
        console.log(doc);
        console.log('Utilisateur trouvé')
        res.status(200).json(doc);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({error: err})
    })
});

route.post('/', async (req,res) => {
    const {pseudo,mail,password} = req.body;
    let user = {};
    user._id = new mongooose.Types.ObjectId();
    user.pseudo = pseudo;
    user.mail = mail;
    user.password = password;
    let userModel = new User(user);
    await userModel.save();
    res.json(userModel);
});

module.exports = route;