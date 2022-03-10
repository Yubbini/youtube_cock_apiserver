'use strict'

const express = require('express')
const swagger_ui = require('swagger-ui-express')
const app = express()

const swagger_on = process.env.SWAGGER_ON || 'true'

if (swagger_on === 'true') {
    app.use('/swagger_docs', swagger_ui.serve, swagger_ui.setup(require('./swagger_docs')))
}

/**
 * @swagger
 * tags:
 *   name: HelloWorld
 *   description: Health Checker
 */

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

module.exports = app