const express = require('express')
const router = express.Router()
const passport = require('../passport.js')

router.get('/', (req, res) => {
    res.render('index', { title: "인덱스" })
})

router.post('/', passport.authenticate('local-login', {
    successRedirect: '/loginSuccess',
    failureRedirect: '/loginFail',
    failureFlash: true
}))

router.get('/loginSuccess', (req, res) => {
    res.render('loginSuccess')
})
router.get('/loginFail', (req, res) => {
    res.render('loginFail')
})

router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
)

router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        successRedirect: "/loginSuccess",
        failureRedirect: "/loginFail",
    })
)


module.exports = router