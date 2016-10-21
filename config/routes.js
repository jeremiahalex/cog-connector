const router = require('express').Router()
const collectionName = 'pipes'
// we define a single post route called connect, which takes in a json file and returns a replacement
//   // if we don't have the data we need then just return it as is
//   if (!data || !data.props) {
//     return res.json(data)
//   }
//
//   // if we have props, apply this cog to the list of transforms
//   if (!data.transforms) data.transforms = []

// LIST
router.get('/', (req, res) => {
  req.app.get('db').collection(collectionName).find().toArray((err, results) => {
    res.json(results)
  })
})
// CREATE
router.post('/', (req, res) => {
  if (!req.body || !req.body.cogs) return res.status(422).json({err: 'no cogs data provided'})

  const newPipe = {
    cogs: [req.body.cogs]
  }
  req.app.get('db').collection(collectionName).save(newPipe, (err, result) => {
    if (err) return res.status(404).json({err: err})

    res.json(result)
  })
})

// SHOW, UPDATE, DESTROY
router.get('/:id', (req, res) => {
  // db.peanut.find({
  //   where: {id: req.params.id}
  // }).then(function (foundPeanut) {
  //   res.json(foundPeanut)
  // })
})
router.patch('/:id', (req, res) => {
  // var foundPeanut = peanuts[req.params.id]
  // if (foundPeanut) {
  //   if (req.body.name) foundPeanut.name = req.body.name
  //   if (req.body.cost) foundPeanut.cost = req.body.cost
  // }
  // res.json(foundPeanut)
})
router.delete('/:id', (req, res) => {
  // // remove the peanut from the object
  // // delete peanuts[req.params.id]
  // db.peanut.destroy({
  //   where: { id: req.params.id }
  // }).then(function () {
  //   res.json({message: 'success'})
  // })
})
router.post('/:id', (req, res) => {
})

module.exports = router
