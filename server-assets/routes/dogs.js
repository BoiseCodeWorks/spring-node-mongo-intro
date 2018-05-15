var router = require('express').Router()
var Dogs = require('../models/dog')


router.get('/api/dogs', (req, res, next) => {
  Dogs.find({})
    .then(dogs=>{
      res.status(200).send(dogs)
    })
    .catch(err=>{
      res.status(400).send(err)
    })
})


router.post('/api/dogs', (req, res, next) => {
  var cat = req.body
  Dogs.create(cat)
    .then(newDog=>{
      res.status(200).send(newDog)
    })
    .catch(err=>{
      res.status(400).send(err)
    })
})


module.exports = { router }