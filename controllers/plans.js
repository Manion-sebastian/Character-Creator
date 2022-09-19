const express = require('express')
const router = express.Router()
const db = require('../models')
const methodOverride = require('method-override')
const multer = require('multer')
const upload = multer({dest: './uploads/'})
const cloudinary = require('cloudinary').v2

router.use(express.urlencoded({extended:false})) 
router.use(methodOverride('_method'))

// Shows Form for making Plan
router.get('/', (req,res) => {
    res.render('./plans/new', {user: res.locals.user})
})

// Creates new Plan
router.post('/', upload.single('banner'), async (req,res) => {
    try {
        let bannerUrl = ''
        await cloudinary.uploader.upload(req.file.path, {transformation: [
            {height: 300, width: 500, crop: "scale"}]},
            (error, result) => {
                if (result) {
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
            banner_image: bannerUrl,
            typeId: req.body.type
        })

        res.redirect('/users/profile')
    } catch(error) {
        console.log(error)
    }
})

// Shows all plans by user
router.get('/all', async (req, res) => {
    const user = await db.user.findOne({
        where: {
            id: res.locals.user.id
        }
    })
    const plans = await user.getPlans()
    res.render('./plans/all', {plans: plans})
})

// Shows singular plan by id
router.get('/show/:id', async (req, res) => {
    const findPlan = await db.plan.findOne({
        where: {
            userId: res.locals.user.id,
            id: req.params.id
        },
            include: [db.type]
    })
    res.render('./plans/show', {plan: findPlan})
})

// Shows edit form for specific plan
router.get('/edit/:id', async (req,res) => {
    try {
        const findPlan = await db.plan.findOne({
            where: {
                userId: res.locals.user.id,
                id: req.params.id
            }
        })
        res.render('./plans/info', {plan: findPlan})

    } catch(error) {
        console.warn(error)
    }
})

// Edits singular plan by id
router.put('/edit/:id', async (req,res) => {
    try {
        await db.plan.update({
            name: req.body.name,
            description: req.body.desc,
            content: req.body.content
        },{
            where: {
                id: req.params.id
            }
        })
        res.redirect(`/plans/show/${req.params.id}`)
    } catch(error) {
        console.warn(error)
    }
})

router.delete('/:id', async (req,res) => {
    try {
        
        await db.plan.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect('/plans/all')
    } catch(error) {
        console.log(error)
    }

})


module.exports = router