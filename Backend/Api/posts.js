const express = require('express')
const mongooose = require('mongoose')

const posts = require('../DB/posts')

const bodyParser = require('body-parser')
const fs = require('fs')

const jwt = require('jsonwebtoken')
const { time } = require('console')


const route = express.Router()


route.get('/posts', (req, res) =>{
    console.log('liste des posts')
    const {offset} = req.headers;
    console.log(req.headers);
    console.log(offset)
    posts.find().sort({time: -1}).skip(2*(Number(offset)-1)).limit(2, function (e, d) {})
    .then((result) => {
        console.log(result);
        console.log(result.length);
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


route.post('/posts/post',verifyToken,(req,res,next) => {
    console.log('New post request')
    console.log(req.body)

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