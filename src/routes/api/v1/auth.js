'use strict'

const express = require('express')
const {google} = require('googleapis')
const {OAuth2Client} = require('google-auth-library')

var cock = require('../../../models/cock')

const router = express.Router()

const client = new OAuth2Client(process.env['GOOGLE_CLIENT_ID'])

async function verify(id_token) {
    const ticket = await client.verifyIdToken({
        idToken: id_token
    })
    return new Promise(resolve=>{
        const payload = ticket.getPayload()
        console.log(payload)
        cock.findOne({uid : payload['sub']}, function(err, docs){
            if(err) console.log(err)
            else if(!docs){
                var cockModel = new cock(
                    {
                        uid : payload['sub'],
                        name : payload['name'],
                        email : payload['email'],
                        picture :  payload['picture'],
                        locale : payload['locale']
                    }
                )
                cockModel.save()
            }
            else console.log('데이터 베이스에 존재하는 유저 정보입니다.')
        })
        resolve(payload)
    })
}

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
    res.redirect(googleOauthClient.generateAuthUrl({ scope: scopes }));
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
                        google_id_token: tokens.id_token,
                        google_user_id: payload.sub,
                        google_email: payload.email
                    })
                })
        })
})

/**
 * @swagger
 * /api/v1/auth:
 *  post:
 *      description: Verify Id_token
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: string
 *                              description: user_id_token
 *      responses:
 *          200:
 *              description: OK
 *          400:
 *              description: unverified
 */

router.post('/', (req, res) => {
    var id_token = req.body.id
    const ticket = verify(id_token)
        .then(function(result){
            res.status(200).json(result)
        })
        .catch((err)=>{
            res.status(400).json({message : "err"})
        })
})

module.exports = router