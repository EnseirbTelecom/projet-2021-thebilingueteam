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



const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc= require('swagger-jsdoc');


// doc: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition : {
        components: {},
        info: {
            title: "InpGram API",
            description: "User Api Information",
            servers: ["http://localhost:9000"],
        }
    },
    apis: ["./Api/*.js"]
};

const swaggerDocument = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



const port = process.env.PORT_SERVER
app.listen(port, () => console.log('Server started on port '+ port))