const express = require('express')
const mongooose = require('mongoose')

const posts = require('../DB/posts')

const bodyParser = require('body-parser')
const fs = require('fs')

const jwt = require('jsonwebtoken')


const route = express.Router()


route.get('/posts', (req, res) =>{
    console.log('liste des posts')
    posts.find()
    .then((result) => {
        res.status(200).json(result)
    })
})


route.post('/posts/post',verifyToken,(req,res,next) => {
    console.log('New post request')
    console.log(req.body)

    const {imgsource, title, description} = req.body
    const post = {
        _id: new mongooose.Types.ObjectId(),
        userId: req.id.id,
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