'use strict'

const express = require('express')
const router = express.Router()

const play_list = require('./v1/play_lists')
const auth = require('./v1/auth')

router.use('/play_lists', play_list)
router.use('/auth', auth)

module.exports = router