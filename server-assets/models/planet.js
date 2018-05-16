var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
var schemaName = 'Planet'


var schema = new Schema({
  name: {
    type: String,
    required: true
  },

  // relationship
  galaxyId: {
    type: ObjectId,
    ref: 'Galaxy',
    required: true
  },
  starId: {
    type: ObjectId,
    ref: 'Star',
    required: true
  }
})

module.exports = mongoose.model(schemaName, schema)