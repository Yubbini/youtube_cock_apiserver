'use strict'

const express = require('express')
const swagger_ui = require('swagger-ui-express')
const app = express()

const cors = require('cors')
const body_parser = require('body-parser')

const api = require('./routes/api')

app.use(cors())
app.use(body_parser.json())
app.use(body_parser.urlencoded())

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
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use('/api', api)

module.exports = app