var mongoose = require('mongoose')
var Schema = mongoose.Schema
var schemaName = 'Cat'


var schema = new Schema({
  name: { type: String, required: true},
  food: { type: String, maxlength: 55},
  remainingLives: { type: Number, required: true, default: 9},
  isHappy: {type: Boolean, default: false},
  created: {type: Number, default: Date.now()},
  status: {type: String, enum: ['happy', 'bity', 'shanky']}
})

module.exports = mongoose.model(schemaName, schema)

