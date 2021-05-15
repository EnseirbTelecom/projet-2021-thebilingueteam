const express = require('express')
const mongooose = require('mongoose')

const User = require('../DB/User')

const jwt = require('jsonwebtoken')

const bodyParser = require('body-parser')
const fs = require('fs')

const route = express.Router()



route.post('/signup', async (req,res) => {
    console.log('requete post')
    const {mail,pseudo,password} = req.body
    User.findOne({mail: mail}) //on vérifie si l'utilsateur est présent dans la BDD
    .then((doc) => {
        if (doc === null){ //le mail n'est pas utilise et on peut enregisrer l'utilisateur
            const user = {
                _id: new mongooose.Types.ObjectId(),
                pseudo: pseudo,
                mail: mail,
                password: password,
                userPP: 'https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png',
                bio: ''
            }
            const newUser = new User(user)
            newUser.save().then( result => {
                console.log(result)

                const accessToken = jwt.sign({id: user._id},process.env.ACCESS_TOKEN_SECRET,  {expiresIn: process.env.TOKEN_EXPIRATION_TIME})
                res.status(200).json(accessToken) 

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


route.get('/login',(req,res) => {
    console.log(req.headers)
    const {mail,password} = req.headers
    User.findOne({mail:mail,password:password})
    .then((doc) =>{
        if(doc===null){//echec de login
            console.log('sign in failed')
            res.status(415).json('Cette adresse mail et ce mot de passe ne correspondent à aucun compte');
        }
        else{//login reussi
            console.log('sign in suceed')
            const accessToken = jwt.sign({id: doc._id},process.env.ACCESS_TOKEN_SECRET,  {expiresIn: process.env.TOKEN_EXPIRATION_TIME})
            res.status(200).json(accessToken) 
        }
    })
})

route.get('/user',verifyToken,(req,res,next) => {
    console.log('recuperation du profil utilisateur')
    User.findById(req.id.id)
    .then((result) => {
        console.log(result)
        res.status(200).json(result)
    })
    .catch((err) =>{
        console.log(err)
        res.status(415).json(err)
    })
})

route.post('/user/bio', verifyToken,(req,res,next) => {
    const bio = req.body.bio
    User.findByIdAndUpdate(req.id.id,{bio: bio},{useFindAndModify: true})
    .then((result) => {
        res.status(200)
    })
})

route.post('/user/profilepicture',verifyToken,(req,res,next) => {
    console.log('profile picture post request')
    strProfilePicture = req.body.imgsource
        User.findByIdAndUpdate(req.id.id,{userPP: req.body.imgsource},{useFindAndModify: true})
    .then((result) => {
        res.status(200)
    })
    .catch((err)=>{
        res.status(500).json(err)
    })
})

route.post('/user/post',verifyToken,(req,res,next) => {
    console.log('New post request')
    console.log(req.body.imgsource)
    console.log(req.body)
    fs.writeFile('./out.png', req.body.imgsource, 'base64', (err) => {
		if (err) throw err
	})

    res.status(200)
})


route.get('/users', verifyToken, (req,res,next) => {
    console.log('liste des utilisateurs')
    User.find({},).select('-password -mail -_id -__v')
    .then((result) => {
        res.status(200).json(result)
    })
})

route.get('/user',verifyToken,(req,res,next) => {
    console.log('recuperation du profil utilisateur')
    User.findById(req.id.id)
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) =>{
        console.log(err)
        res.status(415).json(err)
    })
})

route.get('/user/search',(req,res,next) => {
    console.log('New search request')
    const {pseudo} = req.headers
    User.findOne({pseudo: pseudo})
    .then((doc) =>{
        if(doc===null){//echec la recherche
            console.log('user does not exist')
            res.status(415).json('Ce nom d\'utilisateur ne correspondent à aucun compte');
        }
        else{//recherche réussie
            console.log('search suceed')
            res.status(200).json(doc)
        }
    })
})


function verifyToken(req,res,next){
    const authHeader = req.headers['authorization']
    console.log(authHeader);
    const token = authHeader && authHeader.split (' ')[1]
    console.log(token);
    if (token ===  null) return res.status(401)

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,id) => {
        if (err) {
            console.log(err)
            return res.status(403).json('Reconnectez vous votre token est expiré')
        } 
        req.id = id
        next()
    })
}






module.exports = route