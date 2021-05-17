require('dotenv').config()

const express = require('express')
const app = express()

const connectDB = require('./DB/connection.js')
connectDB()

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ limit: "50MB", extended: true, parameterLimit:50000}));
app.use(bodyParser.json({ limit: '50MB' }))

app.set("view engine", "ejs");

app.use('/api', require('./Api/User'))
app.use('/api', require('./Api/posts'))

const port = process.env.PORT_SERVER
app.listen(port, () => console.log('Server started on port '+ port))