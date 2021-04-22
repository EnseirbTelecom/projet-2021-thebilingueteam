require('dotenv').config()
const express = require('express')
const connectDB = require('./DB/connection.js')
const app = express();

connectDB(); //connect

app.use(express.json({extended: false}));

app.use('/api', require('./Api/User'));


const port = process.env.port || 9000;

app.listen(port, () => console.log('Server Started on port '+ port));