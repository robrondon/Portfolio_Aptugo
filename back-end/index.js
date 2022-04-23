const dotenv = require('dotenv')
dotenv.config({ path: './config/.env.development' })
const fs = require('fs')
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
app.all('*', checkReq)
function checkReq(req, res, next) {
  if (req.files) {
    const keys = Object.keys(req.files)
    keys.forEach((key) => {
      const regex = /(.*)\[([0-9]*)\]/gm
      let m = regex.exec(key)
      if (m) {
        if (m[2] === '0') {
          req.body[m[1]] = []
          req.files[m[1]] = []
        }
        req.body[m[1]].push(req.files[key])
        req.files[m[1]].push(req.files[key])
        delete req.files[key]
      }
    })
  }
  next()
}

const dbConfig = require('./config/database.config.js')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Successfully connected to the database')
  })
  .catch((err) => {
    console.log('Could not connect to the database. Exiting now...', err)
    // process.exit();
  })

require('./app/routes/apiRoutes.js')(app)

app.use('/api/images', express.static('./uploads'))

let tries = 0

function doListen() {
  const port = 4567
  const server = app
    .listen(port, '0.0.0.0')
    .on('listening', () => {
      console.log(`Aptugo app listening on port ${port}!`)
    })
    .on('error', (err) => {
      if (err.errno === 'EADDRINUSE') {
        if (tries < 3) {
          console.log('Port busy, waiting a couple of seconds...')
          tries++
          setTimeout(doListen, 2000)
        } else {
          console.log('Tired of waiting, will kill the process...')
          exec(`kill -9 $(lsof -t -i:${port})`)
          setTimeout(doListen, 2000)
        }
      } else {
        console.log(err)
      }
    })
    .on('connection', (conn) => {
      console.log('connection')
    })
}

doListen()
