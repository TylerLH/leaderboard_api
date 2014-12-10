mongoose        = require 'mongoose'
uniqueValidator = require 'mongoose-unique-validator'
bcrypt          = require 'bcrypt'
SALT_FACTOR     = 10

userSchema = new mongoose.Schema
  username:
    type: String
    unique: true
    index: true
    required: 'Username is required'
  email:
    type: String
    index: true
    unique: true
  password:
    type: String
    required: 'Password is required'
  name:
    first:
      type: String
      required: 'First name is required'
    last:
      type: String
      required: 'Last name is required'

# Add unique validator
userSchema.plugin uniqueValidator

# Hash user password before saving
userSchema.pre 'save', (next) ->
  # Only continue if password is new
  return next() unless @isModified 'password'
  bcrypt.hash @password, SALT_FACTOR, (err, hash) =>
    return next(err) if err
    @password = hash
    next()

# Add password validation method to user
userSchema.methods.comparePassword = (input, cb) ->
  bcrypt.compare input, @password, (err, isValid) ->
    return cb(err) if err
    cb null, isValid

module.exports = mongoose.model 'User', userSchema
