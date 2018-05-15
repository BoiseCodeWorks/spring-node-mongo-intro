var router = require('express').Router()
var Cats = require('../models/cat')

//GET ALL
router.get('/api/cats', (req, res, next) => {
  Cats.find({})
    .then(cats => {
      res.status(200).send(cats)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

//GET BY ID
router.get('/api/cats/:id', (req, res, next)=>{
  Cats.findById(req.params.id)
    .then(cat =>{
      res.status(200).send(cat)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

//ADD
router.post('/api/cats', (req, res, next) => {
  var cat = req.body
  Cats.create(cat)
    .then(newCat => {
      res.status(200).send(newCat)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

//EDIT
router.put('/api/cats/:id', (req, res, next) => {
  Cats.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(cat => {
      res.status(200).send({message: "Successfully Updated", cat})
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

//DESTROY
router.delete('/api/cats/:id', (req, res, next)=>{
  Cats.findByIdAndRemove(req.params.id)
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