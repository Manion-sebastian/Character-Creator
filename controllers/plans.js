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
        const user = await db.user.findOne({
            where: {
                id: res.locals.user.id 
            }
        })
        const newPlan = await user.createPlan({
            name: req.body.name,
            description: req.body.desc,
            content: req.body.content,
            icon_image: 'https://pbs.twimg.com/media/EZoLX2BX0AIN5yJ.jpg',
            banner_image: 'https://pbs.twimg.com/media/EZoLX2BX0AIN5yJ.jpg',
        })
        res.redirect('/users/profile')
    } catch(error) {
        console.log(error)
    }
})

router.get('/show/:plan', async (req, res) => {
    const findPlan = await db.plan.findOne({
        where: {
            userId: res.locals.user.id,
            name: req.params.plan
        }
    })
    res.render('./plans/show', {plan: findPlan})
})

module.exports = router