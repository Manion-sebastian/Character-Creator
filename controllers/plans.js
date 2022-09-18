const express = require('express')
const router = express.Router()
const db = require('../models')
const methodOverride = require('method-override')
const multer = require('multer')
const upload = multer({dest: './uploads/'})
const cloudinary = require('cloudinary').v2

router.use(express.urlencoded({extended:false})) 
router.use(methodOverride('_method'))

router.get('/', (req,res) => {
    res.render('./plans/new', {user: res.locals.user})
})

router.post('/', upload.single('banner'), async (req,res) => {
    try {
        let bannerUrl = ''
        await cloudinary.uploader.upload(req.file.path, {transformation: [
            {height: 300, width: 500, crop: "scale"}]},
            (error, result) => {
                if (result) {
                    console.log(result)
                    bannerUrl = result.secure_url
                }
            })
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
            banner_image: bannerUrl,
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

router.get('/show/all', async (req, res) => {
    try {
     const findAll = await db.plan.findAll({
        where: {
            userId: res.locals.user.id
        }
     })
     console.log()
     res.render('./plans/all', {plans: findAll})
    } catch (error) {
        console.warn(error)
    }
})

module.exports = router