const express = require('express')
const router = express.Router()
const db = require('../models')
const crypto = require('crypto-js')
const bcrypt = require('bcrypt')
const methodOverride = require('method-override')
const cloudinary = require('cloudinary').v2
const multer = require('multer')
const upload = multer({dest: './uploads/'})

router.use(methodOverride('_method'))



router.get('/', (req,res) => {
    res.render('../views/users/home')
})

router.post('/', async (req,res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 12)
        const [newUser, created] = await db.user.findOrCreate({ where: {
            email: req.body.email,
            first_name: req.body.fName,
            last_name: req.body.lName,
            profile_picture: req.body.profile
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

router.get('/login', (req,res) => {
    res.render('users/login', 
    {message: req.query.message ? req.query.message : null})
})

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

router.get('/login', (req,res) => {
    res.render('./users/login')
})

router.get('/logout', (req,res) => {
    res.clearCookie('userId')
    res.redirect('/')
})

router.get('/profile', (req,res) => {
    // if user is not logged in redirect 
    if (!res.locals.user){
        res.redirect ('/users/login?message=You must authorize before you are authroized to view this resource')
    } else {
        res.render('./users/home', {
            user: res.locals.user
        })
    }
})

router.get('/profile/edit', (req,res) => {
    res.render('./users/info', {user: res.locals.user})
})

router.put('/profile/edit', async (req,res) => {
    try {
        await db.user.update({
            first_name: req.body.fName,
            last_name: req.body.lName,
            email: req.body.email,
            profile_picture: req.body.pPic
        }, {
            where: {
                email: req.body.email
            }
        })
        res.redirect('/users/profile')
    } catch (error) {
        console.warn(error)
    }
})

module.exports = router