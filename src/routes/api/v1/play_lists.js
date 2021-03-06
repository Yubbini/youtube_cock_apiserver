'use strict'

const { assert } = require('chai')
const express = require('express')
const request = require('request')
const cock = require('../../../models/cock')

const router = express.Router()

/**
 * @swagger
 * definitions:
 *  cock:
 *      type: object
 *      properties:
 *          uid:
 *              type: string
 *          name:
 *              type: string
 *          email:
 *              type: string
 *          picture:
 *              type: string
 *          locale:
 *              type: string
 *          playlist:
 *              type: array
 *              items:
 *                  type: object
 *                  properties:
 *                      id:
 *                          type: string
 *                      title:
 *                          type: string
 *                      color:
 *                          type: number
 *  playlist:
 *      type: object
 *      properties:
 *          id:
 *              type: string
 *          title:
 *              type: string
 *          color:
 *              type: number
 */


/**
 * @swagger
 * /api/v1/play_lists:
 *  post:
 *      description: Add playlists.
 *      tags: [PlayList]
 *      parameters:
 *          - in : header
 *            name : Authorization
 *            type : string
 *            description : google_id_token
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          playlist:
 *                              type: array
 *                              items:
 *                                  $ref: '#/definitions/playlist'
 *      responses:
 *          200:
 *              description: OK
 *          400:
 *              description: user not found
 *          500:
 *              description: server error
 */
router.post('/', (req, res) => {
    const id_token = req.get('Authorization')
    const json_data = { 'id': id_token }
    const auth_option = {
        url: process.env['AUTHAPI_URL'],
        body: json_data,
        json: true
    }
    const data = req.body
    request.post(auth_option, function (err, response, body) {
        if (err) res.status(500).json({ message: err })
        else {
            if (response.statusCode == '200') {
                cock.updateOne(
                    { uid: body['sub'] },
                    {
                        $push: {
                            playlist: data.playlist
                        }
                    }, function (err, docs) {
                        if (err) res.status(500).json({ message: err })
                        else if (!docs) res.status(400).json({ message: "user not found" })
                        else res.sendStatus(200)
                    }
                )
                    .setOptions({ runValidators: true })
            }
            else {
                res.status(400).json({ message: "user not found" })
            }
        }
    })
})

/**
 * @swagger
 * /api/v1/play_lists:
 *  get:
 *      description: Returns a playlists of the user in the database.
 *      tags: [PlayList]
 *      parameters:
 *          - in : header
 *            name : Authorization
 *            type : string
 *            description : google_id_token
 *      responses:
 *          200:
 *              description: OK
 *          400:
 *              description: user not found
 *          500:
 *              description: server error
 */

router.get('/', (req, res) => {
    const id_token = req.get('Authorization')
    const json_data = { 'id': id_token }
    const auth_option = {
        url: process.env['AUTHAPI_URL'],
        body: json_data,
        json: true
    }
    request.post(auth_option, function (err, response, body) {
        if (err) res.status(500).json({ message: err })
        else {
            if (response.statusCode == 200) {
                const data = req.params
                cock.findOne(
                    { uid: body['sub'] },
                    function (err, docs) {
                        if (err) res.status(500).json({ message: err })
                        else if (!docs) res.status(400).json({ message: "user not found" })
                        else res.status(200).json({
                            playlist: docs.playlist
                        })
                    }
                )
                    .setOptions({ runValidators: true })
            }
        }
    })
})

/**
 * @swagger
 * /api/v1/play_lists/{id}:
 *  delete:
 *      description: Delete a playlist of the user in the database.
 *      tags: [PlayList]
 *      parameters:
 *          - in : header
 *            name : Authorization
 *            type : string
 *            description : google_id_token
 *          - in: path
 *            name: id
 *            type: string
 *            description: playlist_id
 *      responses:
 *          200: 
 *              description: Playlists remaining in the user's database.
 *          400:
 *              description: user not found
 *          500:
 *              description: server error
 *          
 */

router.delete('/:id', (req, res) => {
    const id_token = req.get('Authorization')
    const json_data = { 'id': id_token }
    const auth_option = {
        url: process.env['AUTHAPI_URL'],
        body: json_data,
        json: true
    }
    request.post(auth_option, function (err, response, body) {
        if (err) res.status(500).json({ message: err })
        else {
            if (response.statusCode == 200) {
                const data = req.params;
                cock.updateOne(
                    { uid: body['sub'] },
                    {
                        $pull: {
                            playlist: {
                                id: data.id
                            }
                        }
                    }, function (err, docs) {
                        if (err) res.status(500).json({ message: err })
                        else if (!docs) res.status(400).json({ message: "user not found" })
                        else {
                            playlist: cock.findOne({ uid: body['sub'] }, function (err, docs2) {
                                if (err) res.status(500).json({ message: err })
                                else if (!docs) res.status(400).json({ message: "user not found" })
                                else res.status(200).json(docs2.playlist)
                            })
                        }
                    }
                )
                    .setOptions({ runValidators: true })
            }
        }
    })
})

module.exports = router