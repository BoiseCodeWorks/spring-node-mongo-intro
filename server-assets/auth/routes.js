let router = require('express').Router();
let Users = require('../models/user');
let session = require('./session')

let loginError = new Error('Bad Email or Password')

router.post('/auth/register', (req, res) => {
  if (req.body.password.length < 5) {
    return res.status(400).send({
      error: 'Password must be at least 6 characters'
    })
  }
  req.body.role = 'guest'
  req.body.hash = Users.generateHash(req.body.password)
  Users.create(req.body)
    .then(user => {
      delete user._doc.hash
      req.session.uid = user._id
      res.send(user)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

router.post('/auth/login', (req, res) => {
  Users.findOne({
      username: req.body.username
    })
    .then(user => {
      if (!user) {
        return res.status(400).send(loginError)
      }

      if (!user.validatePassword(req.body.password)) {
        return res.status(400).send(loginError)
      }
      delete user._doc.hash
      req.session.uid = user._id
      res.send(user)
    }).catch(err => {
      res.status(400).send(loginError)
    })
})

router.delete('/auth/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.send(err)
    }
    return res.send({
      message: 'Logout Successful'
    })
  })
})


router.put('/user/role-change/:uid?', (req, res) => {
  //change your own role
  if (!req.params.uid) {
    Users.findById(req.session.uid)
      .then(user => {
        if (!user) {
          return res.status(401).send(loginError)
        }
        user.role = user.changeRole(req.body.role)
        user.save().then(() => {
            res.send(user)
          })
          .catch(err => {
            res.status(500).send(err)
          })

      }).catch(err => {
        res.status(500).send(err)
      })
  }

  /**
   * find current user
   * find other person
   * 
   * myRole > otherPersonsRole
   * otherPersonRole = reqRole
   * otherPerson.save()
   * 
   */

  Users.findById(req.session.uid).then(currentUser => {
    if (!currentUser) {
      return res.status(401).send(loginError)
    }

    Users.findById(req.params.uid).then(otherUser => {
      if (!otherUser) {
        return res.status(400).send({
          error: 'invalid user id'
        })
      }

      if (!currentUser.setRoleForOther(otherUser, req.body.role)) {
        return res.status(401).send({
          error: 'no can do'
        })
      }

      otherUser.save().then(() => {
        res.send({
          message: 'Success roled to ' + otherUser.role
        })
      }).catch(err => {
        res.status(500).send(err)
      })
    })


  })



})



router.get('/authenticate', (req, res) => {
  Users.findById(req.session.uid)
    .then(user => {
      if (!user) {
        return res.status(401).send({
          error: 'Please login to continue'
        })
      }
      delete user._doc.hash
      res.send(user)
    }).catch(err => {
      res.status(500).send(err)
    })
})




module.exports = {
  router,
  session
}