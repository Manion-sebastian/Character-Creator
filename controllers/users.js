const express = require('express')
const router = express.Router()
const db = require('../models')
const crypto = require('crypto-js')
const bcrypt = require('bcrypt')
const methodOverride = require('method-override')
const cloudinary = require('cloudinary').v2
const multer = require('multer')
const user = require('../models/user')
const upload = multer({dest: './uploads/'})

router.use(methodOverride('_method'))
router.use(express.urlencoded({extended:false}))



// Creates New User
router.post('/', async (req,res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 12)
        const [newUser, created] = await db.user.findOrCreate({ where: {
            email: req.body.email,
            first_name: req.body.fName,
            last_name: req.body.lName,
            profile_picture: 'https://res.cloudinary.com/ga-sei-sm/image/upload/v1663527889/blankUser_uwlkty.png'
            }, 
            defaults: {
                password: hashedPassword
            }
        })
        if (!created) {
            console.log('user exists')
            res.redirect('/users/login?message=Please log into your account to continue')
        } else {
            const encryptedUserId = crypto.AES.encrypt(newUser.id.toString(), process.env.ENC_SECRET)
            const encryptedUserIdString = encryptedUserId.toString()
            res.cookie('userId', encryptedUserIdString)
            res.redirect('./users/profile')

        }

    } catch(err) {
        console.warn(err)
    }
})

// Shows Login Page
router.get('/login', (req,res) => {
    res.render('users/login', 
    {message: req.query.message ? req.query.message : null})
})

// Logs in User
router.post('/login', async (req,res) => {
    try {
        const user = await db.user.findOne({
            where: {
                email: req.body.email
            }
        })
        console.log('user found')
        const noLoginMessage = 'Incorrect username or password'
        if (!user){
            console.log('user not found') 
            res.redirect('/users/login?message=' + noLoginMessage)
        } else if (!bcrypt.compareSync(req.body.password, user.password)) {
            console.log('wrong password')
            res.redirect('/users/login?message=' + noLoginMessage)
        } else {
            const encryptedUserId = crypto.AES.encrypt(user.id.toString(), process.env.ENC_SECRET)
            const encryptedUserIdString = encryptedUserId.toString()
            res.cookie('userId', encryptedUserIdString)
            res.redirect('/users/profile')
        }
    } catch(err) {
        console.log(err)
        res.send('server error')
    }
})

// Logs User out
router.get('/logout', (req,res) => {
    res.clearCookie('userId')
    res.redirect('/')
})

// Shows home page for logged in User
router.get('/profile', async (req,res) => {
    try {
        if (!res.locals.user){
            res.redirect ('/users/login?message=You must authorize before you are authroized to view this resource')
        } else {
            const user = await db.user.findOne({
                where: {
                    id: res.locals.user.id
                }
            })
            const plans = await user.getPlans({
            include: [db.type]
            })
            console.log(plans[1])
            console.log(plans[1].types)
            res.render('./users/home', {
                user: res.locals.user, plans
            })
        }
    }catch(error) {
        console.warn(error)
    }})
        
// Shows edit page for User Info
router.get('/profile/edit', (req,res) => {
    res.render('./users/info', {user: res.locals.user})
})

// Edits User Info
router.put('/profile/edit', async (req,res) => {
    try {
        await db.user.update({
            first_name: req.body.fName,
            last_name: req.body.lName,
            email: req.body.email,
        }, {
            where: {
                id: res.locals.user.id
            }
        })

        res.redirect('/users/profile')
    } catch (error) {
        console.warn(error)
    }
})

// Shows User photo info w/ option to change photo
router.get('/profile/photo', (req,res) => {
    res.render('./users/photo', {user: res.locals.user})
})

// Edits User photo
router.put('/profile/photo', upload.single('profile_picture'), async (req,res) => {
    try {
       await cloudinary.uploader.upload(req.file.path, {transformation: [
            {gravity: "face", height: 400, width: 400, crop: "crop"},
            {radius: "max"},
            {width: 200, crop: "scale"}]},
            (error, result) => {
                if (result) {
                    console.log(result)
                    db.user.update({
                        profile_picture: result.secure_url
                    }, {
                        where: {
                            email: req.body.email
                        } 
                    })
                }
            }) 

            res.redirect('/users/profile')
    } catch(error) {
        console.log(error)
    }
    
})

module.exports = router