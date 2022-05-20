'use strict'

require('dotenv').config()

const app = require('./app')
const port = process.env.PORT || 8080

const mongoose = require('mongoose')

mongoose.connect(process.env['URL'], { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;

db.on("error", () => {
    console.log("> error occurred from the database");
});

db.once("open", () => {
    console.log("> successfully opened the database");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})