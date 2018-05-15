var mongoose = require('mongoose')
var Schema = mongoose.Schema
var schemaName = 'Dog'


var schema = new Schema({
  name: { type: String, required: true},
  food: { type: String, maxlength: 55},
  remainingLives: { type: Number, required: true, default: 1},
  isHappy: {type: Boolean, default: true},
  created: {type: Number, default: Date.now()},
  status: {type: String, enum: ['happy', 'happy', 'happy']},
  toys: [{type: String}]
})

module.exports = mongoose.model(schemaName, schema)
