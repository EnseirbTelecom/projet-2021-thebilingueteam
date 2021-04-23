require('dotenv').config()

const express = require('express')
const app = express()

const connectDB = require('./DB/connection.js')
connectDB()

app.use(express.json({extended: false}))

app.use('/api', require('./Api/User'))

const port = process.env.PORT_SERVER
app.listen(port, () => console.log('Server started on port '+ port))