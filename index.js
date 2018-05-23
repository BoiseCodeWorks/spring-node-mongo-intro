var express = require('express')
var bp = require('body-parser')
var app = express()
var cors = require('cors')
var port = 3000

app.use(cors())
//Fire up database connection
require('./server-assets/db/mlab-config')


//REGISTER MIDDLEWEAR
app.use(bp.json())
app.use(bp.urlencoded({
  extended: true
}))

let auth = require('./server-assets/auth/routes')
app.use(auth.session)
app.use(auth.router)
//Code above is always the same ^^

//routes
var cats = require('./server-assets/routes/cats')
var dogs = require('./server-assets/routes/dogs')
var galaxies = require('./server-assets/routes/galaxies')
var stars = require('./server-assets/routes/stars')
var planets = require('./server-assets/routes/planets')

app.use(cats.router)
app.use(dogs.router)

app.use('/members/*', (req, res, next) => {
  if (!req.session.uid) {
    return res.status(401).send({
      error: 'please login to continue'
    })
  }
  next()
})

app.use('/admin/*', (req, res, next) => {
  /**
    Admins.findOne({
        uid: req.session.uid
      })
      .then(isAdmin => {
        if (!isAdmin) {
          return res.status(401).send({
            error: 'Insufficient Privledges'
          })
        }
        next()
      })

    if (!req.session.uid) {
      return res.status(401).send({
        error: 'please login to continue'
      })
    }
    next()
     */
})


app.use('/members/', galaxies.router)
app.use(stars.router)
app.use(planets.router)

//Catch all

app.get('*', (req, res, next) => {
  res.status(404).send({
    error: 'No matching routes'
  })
})


app.listen(port, () => {
  console.log('server running on port', port)
})