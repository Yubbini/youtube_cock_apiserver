'use strict'

const express = require('express')
const { displayvideo_v1beta } = require('googleapis')
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
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          uid:
 *                              type: string
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
    const data = req.body
    cock.updateOne(
        {uid : data.uid},
        {
            $push : {
                playlist : data.playlist
            }
        }, function(err, docs){
            if(err) res.status(500).json({message : err})
            else if(!docs) res.status(400).json({message: "user not found"})
            else res.sendStatus(200)
        }
    )
})

/**
 * @swagger
 * /api/v1/play_lists/{uid}:
 *  get:
 *      description: Returns a playlists of the user in the database.
 *      tags: [PlayList]
 *      parameters:
 *          - in: path
 *            name: uid
 *            type: string
 *            required: true
 *            description: user_id
 *      responses:
 *          200:
 *              description: OK
 *          400:
 *              description: user not found
 *          500:
 *              description: server error
 */

router.get('/:uid', (req, res) => {
    const data = req.params
    cock.findOne(
        {uid : data.uid},
        function(err, docs){
            if(err) res.status(500).json({message : err})
            else if(!docs) res.status(400).json({message : "user not found"})
            else res.status(200).json({
                playlist : docs.playlist
            })
        }
    )
})

/**
 * @swagger
 * /api/v1/play_lists/{uid}/{id}:
 *  delete:
 *      description: Delete a playlist of the user in the database.
 *      tags: [PlayList]
 *      parameters:
 *          - in: path
 *            name: uid
 *            type: string
 *            required: true
 *            description: user_id
 *          - in: path
 *            name: id
 *            type: string
 *            required: true
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

router.delete('/:uid/:id', (req, res) => {
    const data = req.params;
    cock.updateOne(
        {uid : data.uid},
        {
            $pull : {
                playlist : {
                    id : data.id
                }
            }
        }, function(err, docs){
            if(err) res.status(500).json({message : err})
            else if(!docs) res.status(400).json({message : "user not found"})
            else {
                playlist : cock.findOne({uid:data.uid},function(err, docs2){
                    if(err) res.status(500).json({message : err})
                    else if(!docs) res.status(400).json({message : "user not found"})
                    else res.status(200).json(docs2.playlist)
                })
            }
        }
    )
})

module.exports = router