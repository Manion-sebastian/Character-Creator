require('dotenv').config()
const express = require('express')
const cloudinary = require('cloudinary').v2
const layout = require('express-ejs-layouts')
const axios = require('axios')
const ejs = require('ejs')

const app = express()
const PORT = 3000

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(layout)

app.listen(PORT, () => {
    console.log(`Intruder at ${PORT}`)
} )


// test for cloudinary
// console.log(cloudinary.config().cloud_name)
// console.log(cloudinary.config().api_key)
// console.log(cloudinary.config().api_secret)

// cloudinary.uploader.upload('public/assets/shark.png', {public_id: 'shark'})
//     .then(result => {console.log(result)})
//     .catch(error => {console.warn(error)})


