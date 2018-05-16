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
app.use(bp.urlencoded({extended: true}))


//Code above is always the same ^^

//routes
var cats = require('./server-assets/routes/cats')
var dogs = require('./server-assets/routes/dogs')
var galaxies = require('./server-assets/routes/galaxies')
var stars = require('./server-assets/routes/stars')
var planets = require('./server-assets/routes/planets')

app.use(cats.router)
app.use(dogs.router)
app.use(galaxies.router)
app.use(stars.router)
app.use(planets.router)

//Catch all

app.get('*', (req, res, next)=>{
  res.status(404).send({error: 'No matching routes'})
})


app.listen(port, ()=>{
  console.log('server running on port', port)
})