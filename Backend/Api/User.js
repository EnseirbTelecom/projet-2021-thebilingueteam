const { json } = require('body-parser')
const express = require('express')
const mongooose = require('mongoose')

const User = require('../DB/User')
const jwt = require('jsonwebtoken');

const route = express.Router()

route.post('/', async (req,res) => {
    const {mail,pseudo,password} = req.body
    User.findOne({mail: mail}) //on vérifie si l'utilsateur est présent dans la BDD
    .then((doc) => {
        if (doc === null){ //le mail n'est pas utilise et on peut enregisrer l'utilisateur
            const user = {
                _id: new mongooose.Types.ObjectId(),
                pseudo: pseudo,
                mail: mail,
                password: password,
            }
            const newUser = new User(user)
            newUser.save().then( result => {
                console.log(result)
                res.status(200).json(user)
            })
            .catch((error) => {
                console.log(error)
                res.status(500).json('Erreur lors de l enregistrement de l utilisateur')
            })
        }
        else{ //le mail est déjà utilisé
            res.status(415).json('Cette adresse mail est déjà utilisée par un utilisateur');
        }
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json('Erreur lors de la recherche de l adresse mail dans la BDD')
    })
})


route.get('/',(req,res) => {
    const {mail,password} = req.body
    User.findOne({mail:mail,password:password})
    .then((doc) =>{
        if(doc===null){//echec de login
            res.status(415).json('Cette adresse mail et ce mot de passe ne correspondent à aucun compte');
        }
        else{//login reussi
            jwt.sign({user: doc}, "secretkey",(err,token) =>{
                res.status(200).json({token,})
            })   
        }
    })
})

route.post('/user', (req,res,next) =>{
    jwt.verify(req.token,'secretkey',(err,authData) => {
        if(err){
            res.status(403).json('token unauthorizes')
        } else {
            res.json('post created'),
            authData
        }
    })
    
})



module.exports = route