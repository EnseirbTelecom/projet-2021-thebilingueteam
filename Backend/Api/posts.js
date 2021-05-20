const express = require('express')
const mongooose = require('mongoose')

const posts = require('../DB/posts')

const bodyParser = require('body-parser')
const fs = require('fs')

const jwt = require('jsonwebtoken')
const { time } = require('console')


const route = express.Router()
/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *         time: 
 *            type: string
 *            description: 
 *         date:
 *            type: string
 *            description: date of the post
 *         username:
 *            type: string
 *            description: username of the user who posted
 *         userPP: 
 *            type: string
 *         title: 
 *            type: string
 *            description: uri to the user's profile picture
 *         description:
 *            type: array
 *            description: list of all the accounts followed
 *         imgsource: 
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
 * /posts:
 *   post:
 *      summary: Load 10 posts from your following users
 *      tags: [Post]
 *      parameters: 
 *        - in: header
 *          name: header
 *          description: offset
 *          required: true
 *          type: int
 *        - in: body
 *          name: body
 *          description: following
 *          required: true
 *          type: array
 *            
 *      description: Load 10 posts from your following users
 *      responses :
 *          '200':
 *              description: Posts loaded successfully
 *          '415': 
 *              description: not more documents to load
 * 
*/

route.post('/posts', (req, res) =>{
    console.log('liste des posts')
    const {offset} = req.headers
    const {following} = req.body
    console.log(req.headers)
    console.log(req.body)

    posts.find({ username : { $in : following } }).sort({time: -1}).skip(10*(Number(offset)-1)).limit(10, function (e, d) {})
    //posts.find({ username : { $in : following } })
    .then((result) => {

       if (result.length == 0){
            res.status(415).json('plus de docs');
        } else {
            res.status(200).json(result);
        }
    })
    .catch((err) =>{
        console.log(err);
        res.status(415).json(err);
    })
})

/**
 * @swagger
 * /posts/user:
 *   get:
 *      summary: Get all the posts of an user
 *      tags: [Post]
 *      parameters: 
 *        - in: headers
 *          name: body
 *          required: true
 *            
 *      description: Get all the posts of an user
 *      responses :
 *          '200':
 *              description: request successful
 *              schema: 
 *                  type: "array"
 *                  items: 
 *                      $ref; "#components/schemas/Posts"
 * 
*/

route.get('/posts/user', (req,res) =>{
    console.log('posts d un user')
    posts.find(({username: req.headers.username})).sort({time: -1})
    .then((result) => {
        console.log(result);
        res.status(200).json(result);
    })
})

/**
 * @swagger
 * /posts/post:
 *   post:
 *      summary: Create a new post
 *      tags: [Post]
 *      parameters: 
 *        - in: body
 *          name: body
 *          description: Post object
 *          required: true
 *          schema:
 *              $ref: "#components/schemas/Post" 
 *            
 *      description: Checks if the email given is already in the database, if not, adds the user to the database with the specified pseudo, mail and password. The user is given a generic profile picture and his bio is an empty string. His id is automatically generated
 *      responses :
 *          '200':
 *              description: New post created
*/

route.post('/posts/post',verifyToken,(req,res,next) => {
    console.log('New post request')

    const { imgsource, title, description, date, userPP, username, time } = req.body
    const post = {
        _id: new mongooose.Types.ObjectId(),
        userId: req.id.id,
        time: time,
        date: date,
        userPP: userPP,
        username: username,
        imgsource: imgsource,
        title: title,
        description: description
    }
    const newPost = new posts(post)
    newPost.save().then( result => {
        console.log(result)
        res.status(200)
    })
    .catch((error) => {
        console.log(error)
    })
})

/**
 * @swagger
 * /posts/post/delete:
 *   post:
 *      summary: Deletes a post
 *      tags: [Post]
 *      parameters: 
 *        - in: headers
 *          name: headers
 *          description: Post id
 *          required: true
 *            
 *      description: delete a post with its id
 *      responses :
 *          '200':
 *              description: post deleted
 *          '415':  
 *              description: error when deleting the post
*/

route.post('/posts/post/delete',(req,res,next) =>{
    console.log('supression d un poste');
    posts.deleteOne({_id: req.headers.id})
    .then((result)=>{
        res.status(200).json(result)
    })
    .catch((error)=>{
        console.log(err);
        res.status(415).json(err);
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