'use strict'

const express = require('express')
const router = express.Router()

const play_list = require('./v1/play_lists')

router.use('/play_lists', play_list)

module.exports = router