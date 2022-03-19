'use strict'

module.exports = (req, rep, next) => {
    console.log(`${req.method} ${req.path}`)
    next()
}