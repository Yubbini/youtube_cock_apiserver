'use strict'

const express = require('express')
const swagger_ui = require('swagger-ui-express')
const app = express()

const cors = require('cors')
const body_parser = require('body-parser')

const logger = require('./middlewares/logger')

const api = require('./routes/api')

app.use(logger)

app.use(cors())
app.use(body_parser.json())
app.use(body_parser.urlencoded({extended:true}))

/**
 * @swagger
 * tags:
 *   name: HelloWorld
 *   description: Health Checker
 */
const swagger_on = process.env.SWAGGER_ON || 'true'
if (swagger_on === 'true') {
    app.use('/swagger_docs', swagger_ui.serve, swagger_ui.setup(require('./swagger_docs')))
}

/**
 * @swagger
 * /:
 *   get:
 *     description: Health Checker
 *     tags: [HelloWorld]
 *     produces:
 *     - "application/text"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *
 */

 if(process.env.NODE_ENV === 'production'){
    app.use(function(req, res, next){
        if(req.headers['x-forwarded-proto'] !== 'https' && req.path !== process.env_LE_URL){
            return res.redirect(['https://', req.get('Host'), req.url].join(''));
        }
        return next();
    })
}

app.get('/', (req, res) => {
    res.send('Hello World!')
})

if(process.env.LE_URL && process.env.LE_CONTENT){
    app.get(process.env.LE_URL, function(req, res){
        return res.send(process.env.LE_CONTENT)
    })
}

app.use('/api', api)

module.exports = app