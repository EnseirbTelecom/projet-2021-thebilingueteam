//On this server is only going to be login logout and refresh token
require('dotenv').config()

const express = require('express')
const app = express()

app.use(express.json({extended: false}));


const routeAuth = express.Router()

routeAuth.get('/login', (req,res) => {
    console.log('requete get')
    //Authenticate User
    const mail = req.body.mail
    const password = req.body.password
    const user = {mail: mail, password: password}
    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    res.status(200).json({accessToken: accessToken, refreshToken: refreshToken})
})

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.TOKEN_EXPIRATION_TIM})
}

const port = process.env.PORT_AUTH_SERVER;

app.listen(port, () => console.log('Autentification server started on port '+port))
