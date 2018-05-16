var router = require('express').Router()
var Planets = require('../models/planet')

//GET ALL
router.get('/api/planets', (req, res, next) => {
  Planets.find(req.query)
    .then(planets => {
      res.status(200).send(planets)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

//GET BY ID
router.get('/api/planets/:id', (req, res, next)=>{
  Planets.findById(req.params.id)
    .then(planet =>{
      res.status(200).send(planet)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

//ADD
router.post('/api/planets', (req, res, next) => {
  var planet = req.body
  Planets.create(planet)
    .then(newCat => {
      res.status(200).send(newCat)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

//EDIT
router.put('/api/planets/:id', (req, res, next) => {
  Planets.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(planet => {
      res.status(200).send({message: "Successfully Updated", planet})
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

//DESTROY
router.delete('/api/planets/:id', (req, res, next)=>{
  Planets.findByIdAndRemove(req.params.id)
    .then(data=>{
      res.send("Successfully Deleted")
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

module.exports = {
  router
}