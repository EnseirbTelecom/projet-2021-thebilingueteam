require('dotenv').config()

const express = require('express')
const app = express()

const connectDB = require('./DB/connection.js')
connectDB()

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', require('./Api/User'))

const port = process.env.PORT_SERVER
app.listen(port, () => console.log('Server started on port '+ port))