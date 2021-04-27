const express = require('express')
const mongooose = require('mongoose')

const User = require('../DB/User')
const jwt = require('jsonwebtoken');

const route = express.Router()

route.post('/', async (req,res) => {
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
                description: ''
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
    const {mail,password} = req.headers
    User.findOne({mail:mail,password:password})
    .then((doc) =>{
        if(doc===null){//echec de login
            res.status(415).json('Cette adresse mail et ce mot de passe ne correspondent à aucun compte');
        }
        else{//login reussi

            const accessToken = jwt.sign({id: doc._id},process.env.ACCESS_TOKEN_SECRET )
            console.log({token: accessToken});
            res.status(200).json({token: accessToken}) 
        }
    })
})

route.post('/user', verifyToken,(req,res,next) => {
    const description = req.body.description;
    User.findByIdAndUpdate(req.id.id,{description: description},{useFindAndModify: true}).then((result) => {
        res.status(200).json({description: description})
    })
})

function verifyToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split (' ')[1]
    if (token ===  null) return res.status(401)

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,id) => {
        if (err) return res.status(403)
        req.id = id
    })
    next()
}






module.exports = route