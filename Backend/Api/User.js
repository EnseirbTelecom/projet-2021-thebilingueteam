const express = require('express')
const mongooose = require('mongoose')

const User = require('../DB/User')

const jwt = require('jsonwebtoken')

var fs = require('fs');
var path = require('path');

const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

const upload = multer({ dest: '/Users/timotheeJanvier/Desktop/projet-2021-thebilingueteam/Backend/profilePicture' })
 

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
            }
            const newUser = new User(user)
            newUser.save().then( result => {
                console.log(result)

                const accessToken = jwt.sign({id: user._id},process.env.ACCESS_TOKEN_SECRET,  {expiresIn: process.env.TOKEN_EXPIRATION_TIME})
                res.status(200).json({accessToken}) 

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
            const accessToken = jwt.sign({id: doc._id},process.env.ACCESS_TOKEN_SECRET,  {expiresIn: process.env.TOKEN_EXPIRATION_TIME})
            res.status(200).json({accessToken}) 
        }
    })
})

route.post('/user/description', verifyToken,(req,res,next) => {
    const description = req.body.description;
    User.findByIdAndUpdate(req.id.id,{description: description},{useFindAndModify: true}).then((result) => {
        res.status(200).json({description: description})
    })
})
route.post('/user/profilepicture',verifyToken,(req,res,next) => {
    console.log('profile picture post request')
    const profilePicture = {
        data: fs.readFileSync(path.join(__dirname + '/uploads/'+ req.file.filename)),
        contentType: 'iamge/png'
    }
    User.findByIdAndUpdate(req.id.id,{profilePicture: profilePicture},{useFindAndModify: true}).then((result) => {
        res.status(200).json('profile Picture modified')
    })
})

function verifyToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split (' ')[1]
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