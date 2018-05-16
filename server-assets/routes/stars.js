var router = require('express').Router()
var Stars = require('../models/star')

//GET ALL
router.get('/api/stars', (req, res, next) => {
  Stars.find(req.query)
    .then(stars => {
      res.status(200).send(stars)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

//GET BY ID
router.get('/api/stars/:id', (req, res, next) => {
  Stars.findById(req.params.id)
    .then(star => {
      res.status(200).send(star)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

//ADD
router.post('/api/stars', (req, res, next) => {
  var star = req.body
  Stars.create(star)
    .then(newCat => {
      res.status(200).send(newCat)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

//EDIT
router.put('/api/stars/:id', (req, res, next) => {
  Stars.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    .then(star => {
      res.status(200).send({
        message: "Successfully Updated",
        star
      })
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

//DESTROY
router.delete('/api/stars/:id', (req, res, next) => {
  Stars.findByIdAndRemove(req.params.id)
    .then(data => {
      res.send("Successfully Removed")
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

module.exports = {
  router
}