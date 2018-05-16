var router = require('express').Router()
var Galaxies = require('../models/galaxy')

//GET ALL
router.get('/api/galaxies', (req, res, next) => {
  Galaxies.find(req.query)
    .then(galaxies => {
      res.status(200).send(galaxies)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

//GET BY ID
router.get('/api/galaxies/:id', (req, res, next)=>{
  Galaxies.findById(req.params.id)
    .then(galaxy =>{
      res.status(200).send(galaxy)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

//ADD
router.post('/api/galaxies', (req, res, next) => {
  var galaxy = req.body
  Galaxies.create(galaxy)
    .then(newCat => {
      res.status(200).send(newCat)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

//EDIT
router.put('/api/galaxies/:id', (req, res, next) => {
  Galaxies.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(galaxy => {
      res.status(200).send({message: "Successfully Updated", galaxy})
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

//DESTROY
router.delete('/api/galaxies/:id', (req, res, next)=>{
  Galaxies.findByIdAndRemove(req.params.id)
    .then(data=>{
      res.send("Successfully Deleted Cat")
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

module.exports = {
  router
}