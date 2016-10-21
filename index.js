const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const path = require('path')
const app = express()
require('dotenv').config({silent: true})

app.use(cors())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function (req, res) {
  res.send('index.html')
})

app.use('/pipes', require('./config/routes'))

// ERRORS
app.use((req, res, next) => {
  // catch 404 and pass on to error handlers
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Catch Errors
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: err
  })
})

// Connect DB and Start Express
MongoClient.connect(process.env.MONGODB_URI, (err, db) => {
  if (err) {
    throw err
  }
  console.log('Database Connected')
  app.set('db', db)
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Connector Ready`)
  })
})
