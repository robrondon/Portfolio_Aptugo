const dotenv = require('dotenv')
dotenv.config({ path: './config/.env.development' })

const express = require('express')
const bodyParser = require('body-parser')
const fileupload = require('express-fileupload')

const app = express()
app.set('filesFolder', __dirname + '/../dist/img')

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, XMLHttpRequest, authorization, *')
  res.header('Access-Control-Allow-Methods', '*')
  next()
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(fileupload())

const dbConfig = require('./config/database.config.js')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Successfully connected to the database')
  })
  .catch((err) => {
    console.log('Could not connect to the database. Exiting now...', err)
    // process.exit();
  })

app.use('/api/images', express.static('./uploads'))

module.exports = app
