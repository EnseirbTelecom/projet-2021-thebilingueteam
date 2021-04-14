const express = require('express');
const connectDB = require('./DB/connection.js');
const app = express();

connectDB();

app.use(express.json({extended: false}));
app.use('/api/userModel', require('./Api/User'));
const port = 3000;

app.listen(port, () => console.log('Server Started'));