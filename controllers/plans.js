const express = require('express')
const router = express.Router()
const db = require('../models')
const methodOverride = require('method-override')

router.use(express.urlencoded({extended:false})) 
router.use(methodOverride('_method'))

router.get('/', (req,res) => {
    res.render('./plans/new', {user: res.locals.user})
})

router.post('/', async (req,res) => {
    try {
        console.log(req.body)
        await db.plan.create({
            name: req.body.name,
            description: req.body.desc,
            content: req.body.content,
            icon_image: 'https://pbs.twimg.com/media/EZoLX2BX0AIN5yJ.jpg',
            banner_image: 'https://pbs.twimg.com/media/EZoLX2BX0AIN5yJ.jpg',
            userId: req.body.userId
        })
        res.redirect('./users/profile')

    } catch(error) {
        console.log(error)
    }
})

module.exports = router