const router = require('express').Router()
const collectionName = 'pipes'
const request = require('request');
const ObjectID = require('mongodb').ObjectID;

// LIST
router.get('/', (req, res) => {
  req.app.get('db').collection(collectionName).find().toArray((err, results) => {
    if (err) throw(err)
    res.json(results)
  })
})
// CREATE
router.post('/', (req, res) => {
  if (!req.body || !req.body.cogs) return res.status(422).json({err: 'no cogs data provided'})

  // TODO. validation
  const newPipe = {
    cogs: req.body.cogs
  }
  req.app.get('db').collection(collectionName).insertOne(newPipe, (err, result) => {
    if (err) return res.status(422).json({err: err})
    res.json(result.ops[0])
  })
})

// RUN the pipe - use a post request to a specific id as a means of calling it
router.post('/:id', (req, res) => {
  const data = req.body
  if (!data || !data.props) {
    return res.status(422).json({err: 'no props data provided'})
  }

  req.app.get('db').collection(collectionName).findOne({"_id": ObjectID(req.params.id)},(err, doc) => {
    if (err) throw(err)

    if (!doc) {
      return res.status(404).json({err: 'Pipe not found'})
    }
    if (doc.cogs.length === 0) {
      return res.status(422).json({err: 'no cogs in pipe'})
    }
    // process each cog - TODO. this looks messy and can probably be improved
    var cogResponse = request.post({url: doc.cogs[0], json: data })
    for (var i = 1; i < doc.cogs.length-1; i++) {
      cogResponse = cogResponse.pipe(request.post(doc.cogs[i]))
    }
    cogResponse.pipe(request.post(doc.cogs[doc.cogs.length-1], (error, response, body) => {
      if (response.statusCode === 200) {
        return res.json(JSON.parse(body))
      }
      return res.status(response.statusCode).json({err: error})
    }))
  })
})

// SHOW, UPDATE, DESTROY
router.get('/:id', (req, res) => {
  res.json({'message': 'coming soon'})
})
router.patch('/:id', (req, res) => {
  res.json({'message': 'coming soon'})
})
router.delete('/:id', (req, res) => {
  res.json({'message': 'coming soon'})
})

module.exports = router
