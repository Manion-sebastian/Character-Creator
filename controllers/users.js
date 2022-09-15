const express = require('express')
const router = express.Router()
const db = require('../models')
const crypto = require('crypto-js')
const bcrypt = require('bcrypt')

router.get('/', (req,res) => {
    res.render('../views/users/home')
})

router.post('/', async (req,res) => {
    res.send(req.body)
    await db.user.create({
        first_name: req.body.fName,
        last_name: req.body.lName,
        email: req.body.email,
        profile_picture: req.body.profile

    })

})

// router.post('/', async (req,res) => {
//     try {
//         const hashedPassword = bcrypt.hashSync(req.body.password, 12)
//         const [newUser, created] = await db.user.findOrCreate({ where: {
//             email: req.body.email,
//             }, 
//             defaults: {
//                 password: hashedPassword
//             }
//         })
//         if (!created) {
//             console.log('user exists')
//             res.redirect('/users/login?message=Please log into your account to continue')
//         } else {
//             const encryptedUserId = crypto.AES.encrypt(newUser.id.toString(), process.env.ENC_SECRET)
//             const encryptedUserIdString = encryptedUserId.toString()
//             res.cookie('userId', encryptedUserIdString)
//             res.redirect('./users/profile')

//         }

//     } catch(err) {
//         console.warn(err)
//     }
// })

// router.post('/login', async (req,res) => {
//     try {
//         const user = await db.user.findOne({
//             where: {
//                 email: req.body.email
//             }
//         })
//         const noLoginMessage = 'Incorrect username or password'
//         if (!user){
//             console.log('user not found') 
//             res.redirect('/users/login?message=' + noLoginMessage)
//         } else if (!bcrypt.compareSync(req.body.password, user.password)) {
//             console.log('wrong password')
//             res.redirect('/users/login?message=' + noLoginMessage)
//         } else {
//             const encryptedUserId = crypto.AES.encrypt(user.id.toString(), process.env.ENC_SECRET)
//             const encryptedUserIdString = encryptedUserId.toString()
//             res.cookie('userId', encryptedUserIdString)
//             res.redirect('/users/profile')
//         }
//     } catch(err) {
//         console.log(err)
//         res.send('server error')
//     }
// })

// router.get('/logout', (req,res) => {
//     res.clearCookie('userId')
//     res.redirect('/')
// })

module.exports = router