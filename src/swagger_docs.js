'use strict'

const swaggerJSDoc = require('swagger-jsdoc');

const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 8080

const swaggerDefinition = {
    openapi : '3.0.0',
    info : { // 정보 작성
        title : 'youtube_cock',
        version : '1.0.0',
        description : 'youtube_cock_docs'
    },
    host : `${host}:${port}`,
    basePath : '/',
    schemes: ['http', 'https']
};

const options = {
    swaggerDefinition: swaggerDefinition,
    apis: [
        `${__dirname}/routes/**/*.js`,
        `${__dirname}/app.js`
    ]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;