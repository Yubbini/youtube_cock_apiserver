'use strict'

const express = require('express')
const {google} = require('googleapis');

const router = express.Router()

const googleOauthClient = new google.auth.OAuth2(
    process.env['GOOGLE_CLIENT_ID'],
    process.env['GOOGLE_CLIENT_SECRET'],
    process.env['GOOGLE_CLIENT_CALLBACK_URL']
)
const scopes = [
    'email',
    'profile',
    'https://www.googleapis.com/auth/youtube'
]

router.get('/login/google', (req, res) => {
    res.redirect(googleOauthClient.generateAuthUrl({ scope: scopes }))
})

router.get('/oauth2/redirect/google', (req, res) => {
    googleOauthClient
        .getToken(req.query['code'])
        .then((tokenRes) => {
            const { tokens } = tokenRes

            googleOauthClient
                .verifyIdToken({ idToken: tokens.id_token })
                .then((loginTicket) => {
                    // Add login process
                    const payload = loginTicket.getPayload()
                    res.json({
                        google_access_token: tokens.access_token,
                        google_user_id: payload.sub,
                        google_email: payload.email
                    })
                })
        })
})

module.exports = router