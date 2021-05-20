const express = require('express');
const mongooose = require('mongoose');

const User = require('../DB/User');

const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');
const fs = require('fs');

const route = express.Router();


// swagger documentation: https://swagger.io/docs/specification/components/

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - password
 *         - mail
 *       properties:
 *         id:
 *           type: string
 *           description: id is generated automatically
 *         pseudo: 
 *            type: string
 *         mail:
 *            type: string
 *         password:
 *            type: string
 *         bio: 
 *            type: string
 *         userPP: 
 *            type: string
 *            description: uri to the user's profile picture
 *         following:
 *            type: array
 *            description: list of all the accounts followed
 *         followers: 
 *            type: array  
 *            description: list of all the accounts following
 *       example:
 *         mail: Jean.do@yahoo.fr
 *         pseudo: Jean Do
 *         password: JsJDeJsB3467
 *         
 *         
 */

/**
 * @swagger
 * /signup:
 *   post:
 *      summary: Create a new user
 *      tags: [User]
 *      consumes: application/json
 *      produces: application/json
 *      parameters: 
 *        - in: body
 *          name: body
 *          description: User object
 *          required: true
 *          schema:
 *              $ref: "#components/schemas/User" 
 *            
 *      description: Checks if the email given is already in the database, if not, adds the user to the database with the specified pseudo, mail and password. The user is given a generic profile picture and his bio is an empty string. His id is automatically generated
 *      responses :
 *          '200':
 *              description: A new user was created and he was given an authentication token
 *          '500' : 
 *              description: Error when adding the user 
 *          '415': 
 *              description: Email was already used by another user
*/

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

/**
 * @swagger
 * /login:
 *   get:
 *      tags: [User]
 *      summary: Finds user in the database with password and email
 *      parameters: 
 *        - name: mail
 *          in: headers
 *          required: true
 *          type: string
 *        - name: password
 *          in: headers
 *          required: true
 *          type: string
 * 
 *      description: Checks if a user exists with given password and email. Used for login
 *      responses :
 *          '200':
 *              description: Login successful
 *          '415': 
 *              description: Email and password not matching any existing account
*/

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

/**
 * @swagger
 * /user:
 *   get:
 *      tags: [User]
 *      summary: Finds user's information in the database with his id
 *      parameters: 
 *        - name: id
 * 
 *      description: Use the token to find the user and the database and return his information
 *      responses :
 *          '200':
 *              description: Request success 
 *          '415': 
 *              description: Error during the request
*/

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
/**
 * @swagger
 * /user/pseudo:
 *   get:
 *      tags: [User]
 *      summary: Finds user's information in the database with his id
 *      parameters: 
 *        - name: id
 * 
 *      description: Similar to /user, expect it only returns the user's pseudo
 *      responses :
 *          '200':
 *              description: Request success 
 *              schema:
 *                  type: "array"
 *                  items: 
 *                      $ref: "#components/schemas/User"
 *          '415': 
 *              description: Error during the request
*/
route.get('/user/pseudo',verifyToken,(req,res,next) => {
    console.log('recuperation du profil utilisateur')
    User.findById(req.id.id)
    .then((result) => {
        res.status(200).json(result.pseudo)
    })
    .catch((err) =>{
        console.log(err)
        res.status(415).json(err)
    })
})

/**
 * @swagger
 * /user/bio:
 *   post:
 *      summary: Change user bio
 *      tags: [User]
 *      parameters:
 *        - name: body
 *          in: body
 *          required: true
 *          type: string
 * 
 *      description: Changes the user's bio
 *      responses :
 *          '200':
 *              description: The user's bio was changed correctly
 *          '500' : 
 *              description: Error when changing bio
*/

route.post('/user/bio', verifyToken,(req,res,next) => {
    const bio = req.body.bio
    User.findByIdAndUpdate(req.id.id,{bio: bio},{useFindAndModify: true})
    .then((result) => {
        res.status(200)
    })
    .catch((err)=>{
        res.status(500).json(err)
    })
})

/**
 * @swagger
 * /user/profilepicture:
 *   post:
 *      summary: Change user profile picture
 *      tags: [User]
 *      parameters: 
 *        - name: body
 *          in: body
 *          required: true
 *          type: string
 * 
 *      description: Changes the user's bio
 *      responses :
 *          '200':
 *              description: The user's profile picture was changed correctly
 *          '500' : 
 *              description: Error when changing profile picture
*/

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

/**
 * @swagger
 * /user/post:
 *   post:
 *      summary: Add new post
 *      tags: [User]
 *      parameters: 
 *        - name: body
 *          in: body
 *          required: true
 *      description: Add a new post to the user's list of posts
 *      responses :
 *          '200':
 *              description: New post added correctly
*/

route.post('/user/post',verifyToken,(req,res,next) => {
    console.log('New post request')
    console.log(req.body.imgsource)
    console.log(req.body)
    fs.writeFile('./out.png', req.body.imgsource, 'base64', (err) => {
		if (err) throw err
	})

    res.status(200)
})
/**
 * @swagger
 * /users:
 *   get:
 *      tags: [User]
 *      summary: TO BE COMPLETED
 *      parameters: 
 *        - name: id
 * 
 *      description: not documented properly, ask toto and timtim for further information
 * 
 *      responses :
 *          '200':
 *              description: Request success 
 *          '415': 
 *              description: Error during the request
*/
route.get('/users', verifyToken, (req,res,next) => {
    console.log('liste des utilisateurs')
    User.find({},).select('-password -mail -_id -__v')
    .then((result) => {
        res.status(200).json(result)
    })
})


/**
 * @swagger
 * /user/follow:
 *   post:
 *      summary: Add a new following relationship
 *      tags: [User]
 *      parameters: 
 *        - name: body
 *          in: body
 *          required: true
 *      description: Add a new following relationship in the following array
 *      responses :
 *          '200':
 *              description: Following was a success
*/



route.post('/user/follow',verifyToken,(req,res,next) => {
    console.log('Follow request')
    const userFollowed = req.body.userFollowed
    console.log('user' + userFollowed)

    User.updateOne({_id: req.id.id},{"$addToSet": { "following": req.body.userFollowed } })
    .then((result) => {
        console.log('following succeed')
        res.status(200).json('Following succed')
    })
    .catch((err) =>{
        console.log(err)
        res.status(415).json(err)
    })
})

/**
 * @swagger
 * /user/unfollow:
 *   post:
 *      summary: Deletes a following relationship
 *      tags: [User]
 *      parameters: 
 *        - name: body
 *          in: body
 *          required: true
 *      description: Deletes a following relationship from the following array
 *      responses :
 *          '200':
 *              description: Unfollowing was a success
*/


route.post('/user/unfollow',verifyToken,(req,res,next) => {
    console.log('Unfollow request')
    const userFollowed = req.body.userFollowed
    console.log('user' + userFollowed)

    User.updateOne({_id: req.id.id},{"$pull": { "following": req.body.userFollowed } })
    .then((result) => {
        console.log('unfollowing succeed')
        res.status(200).json('UnFollowing succed')
    })
    .catch((err) =>{
        console.log(err)
        res.status(415).json(err)
    })
})

/**
 * @swagger
 * /user/suggests:
 *   post:
 *      summary: Suggests users
 *      tags: [User]
 *      description: Deletes a following relationship from the following array
 *      responses :
 *          '200':
 *              description: New post added correctly
 *          '415':
 *              description: Error when requesting suggestions
*/

route.post('/user/suggests',verifyToken,(req,res,next) => {
    console.log('suggest request')

    User.find({ _id : { $nin : req.id.id } }).limit(10)
    .then((result) => {
        console.log('suggest succeed')
        res.status(200).json(result)
    })
    .catch((err) =>{
        console.log(err)
        res.status(415).json(err)
    })
})

/**
 * @swagger
 * /user/search:
 *   get:
 *      summary: Search users
 *      tags: [User]
 *      parameters: 
 *        - name: pseudo
 *          in: headers
 *          required: true
 *      description: Search users in the database that contains the string given
 *      responses :
 *          '200':
 *              description: search was successful
 *          '415':
 *              description: search gave no result
 * 
*/

route.get('/user/search',(req,res,next) => {
    console.log('New search request')
    const {query, myPseudo} = req.headers
    User.find({pseudo: {$nin: myPseudo,$regex: query, $options: "i"}})
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