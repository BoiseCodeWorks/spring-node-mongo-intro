var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')
var Schema = mongoose.Schema
var schemaName = 'User'
const SALT = 12

const USERROLES = [
  "guest",
  "user",
  "moderator"
]

const ADMINROLES = [
  "admin",
  "super admin"
]

const ROLES = [...USERROLES, ...ADMINROLES]

var schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  displayName: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ROLES,
    default: ''
  }
})

schema.statics.generateHash = function (password) {
  return bcrypt.hashSync(password, SALT)
}

schema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.hash)
}

schema.methods.changeRole = function (reqRole) {
  var currentRole = this.role
  if (ROLES.indexOf(reqRole) > ROLES.indexOf(currentRole)) {
    return currentRole
  }
  return reqRole
}


schema.methods.setRoleForOther = function (other, role) {
  //this.role == admin
  // role == 'user'
  // var desiredRole = this.changeRole(role)
  // var indexOfDesired = ROLES.indexOf(desiredRole)
  // var indexOfOtherRole = ROLES.indexOf(other.role)
  // var canChangeRole = indexOfOtherRole < indexOfDesired
  // if (canChangeRole) {
  //   other.role = desiredRole
  //   return true
  // }
  var isAdmin = ADMINROLES.includes(this.role)
  var canChangeRole = isAdmin && ROLES.indexOf(this.role) > ROLES.indexOf(other.role)
  if (canChangeRole) {
    other.role = this.changeRole(role)
    return true
  }
}



module.exports = mongoose.model(schemaName, schema)