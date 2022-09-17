const express = require('express')
const router = express.Router()
const db = require('../models')
const methodOverride = require('method-override')

router.use(methodOverride('_method'))

router.get('/', (req,res) => {
    res.render('./plans/new', {user: res.locals.user})
})

module.exports = router