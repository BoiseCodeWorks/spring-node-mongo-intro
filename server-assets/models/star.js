var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
var schemaName = 'Star'


var schema = new Schema({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    enum: ['blue', 'white', 'red', 'orange', 'yellow']
  },

  // relationship

  galaxyId: {
    type: ObjectId,
    ref: 'Galaxy',
    required: true
  }


})

module.exports = mongoose.model(schemaName, schema)