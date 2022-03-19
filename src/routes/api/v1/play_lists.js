'use strict'

const express = require('express')
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