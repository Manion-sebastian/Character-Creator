const express = require('express')
const router = express.Router()
const db = require('../models')
const methodOverride = require('method-override')

router.use(methodOverride('_method'))



module.exports = router