'use strict'

const express = require('express');
const { displayvideo_v1beta } = require('googleapis');
const cock = require('../../../models/cock');

const router = express.Router()

/**
 * @swagger
 * definitions:
 *   Id:
 *     type: object
 *     required:
 *       -id
 *     properties:
 *       id:
 *         type: integer
 *         description: id
 *   PlayList:
 *     type: object
 *     required:
 *       - id
 *       - title
 *       - color
 *     properties:
 *       id:
 *         type: integer
 *         description: id
 *       title:
 *         type: string
 *         description: title
 *       color:
 *         type: integer
 *         description: color
 */

/**
 * @swagger
 * /api/v1/play_lists:
 *   get:
 *     description: Get playlists
 *     tags: [PlayList]
 *     produces:
 *     - "application/json"
 *     responses:
 *       "200":
 *         description: "playlists"
 *         schema:
 *           type: array
 *           items:
 *             allOf:
 *               - $ref: '#/definitions/PlayList'
 *
 */
router.get('/', (req, res) => {
    res.json([
        {
            id: 1,
            title: 'title1',
            color: 0xffffff
        },
        {
            id: 2,
            title: 'title2',
            color: 0xff0000
        }
    ])
})

router.post('/add_playlist', (req, res) => {
    const data = req.body;
    cock.updateOne(
        {uid : data.uid},
        {
            $push : {
                playlist : {
                    id : data.playlist.id,
                    title : data.playlist.title,
                    color : data.playlist.color
                }
            }
        }, function(err, docs){
            if(err) res.status(500).send({message : err});
            else if(!docs) res.status(400).send({message: "user not found"});
            else res.sendStatus(200)
        }
    )
})

router.get('/find_playlist', (req, res) => {
    const data = req.body;
    cock.findOne(
        {uid : data.uid},
        function(err, docs){
            if(err) res.status(500).send({message : err});
            else if(!docs) res.status(400).send({message : "user not found"});
            else res.status(200).json({
                playlist : docs.playlist
            })
        }
    )
})

router.delete('/delete_playlist', (req, res) => {
    const data = req.body;
    cock.updateOne(
        {uid : data.uid},
        {
            $pull : {
                playlist : {
                    id : data.id
                }
            }
        }, function(err, docs){
            if(err) res.status(500).send({message : err});
            else if(!docs) res.status(400).send({message : "user not found"})
            else res.status(200).json({
                playlist : docs.playlist
            })
        }
    )
})

router.get('/')

/**
 * @swagger
 * /api/v1/play_lists:
 *   post:
 *     description: Create playlists
 *     tags: [PlayList]
 *     produces:
 *       - "application/x-www-form-urlencoded"
 *       - "application/json"
 *     parameters:
 *       - name: id
 *         description: id
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: title
 *         description: title
 *         in: formData
 *         required: true
 *         type: string
 *       - name: color
 *         description: color
 *         in: formData
 *         type: integer
 *     responses:
 *       "201":
 *         description: "Created playlist id"
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Id'
 *
 *
 */
router.post('/', (req, res) => {
    res.status(201)
    res.json({
        id: req.body.id
    })
})

module.exports = router