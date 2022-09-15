require('dotenv').config()
const express = require('express')
const cloudinary = require('cloudinary').v2
const layout = require('express-ejs-layouts')
const axios = require('axios')
const ejs = require('ejs')
const cookieParser = require('cookie-parser')
const crypto = require('crypto-js')
const db = require('./models')
const app = express()
const PORT = 3000
app.set('view engine', 'ejs')
app.use(layout)
app.use(express.static(__dirname + '/public/'))
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

app.use('/users', require('./controllers/users.js'))

// user auth copied
app.use(async (req, res, next) => {
    if (req.cookies.userId) {
        const decryptedId = crypto.AES.decrypt(req.cookies.userId.toString(), process.env.ENC_SECRET)
        const decryptedIdString = decryptedId.toString(crypto.enc.Utf8)
        const user = await db.user.findByPk(decryptedIdString)
        res.locals.user = user
    } else {
        res.locals.user = null
    }
    next()
})

app.listen(PORT, () => {
    console.log(`Intruder at ${PORT}`)
} )

app.get('/', (req,res) => {
    // res.send('working')
    res.render('home')
})


// test for cloudinary
// console.log(cloudinary.config().cloud_name)
// console.log(cloudinary.config().api_key)
// console.log(cloudinary.config().api_secret)

// cloudinary.uploader.upload('public/assets/shark.png', {public_id: 'shark'})
//     .then(result => {console.log(result)})
//     .catch(error => {console.warn(error)})


