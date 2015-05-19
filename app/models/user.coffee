mongoose        = require 'mongoose'
Schema          = mongoose.Schema
uniqueValidator = require 'mongoose-unique-validator'
hidden          = do require 'mongoose-hidden'
bcrypt          = require 'bcrypt'
SALT_FACTOR     = 10

Score = require './score'

userSchema = new Schema
  username:
    type: String
    unique: true
    index: true
    lowercase: true
    required: 'Username is required'
  email:
    type: String
    index: true
    unique: true
  password:
    type: String
    required: 'Password is required'
    hide: true
  name:
    first:
      type: String
      required: 'First name is required'
    last:
      type: String
      required: 'Last name is required'
  scores: [{type: Schema.Types.ObjectId, ref: 'Score'}]

# Include virtuals when returning object or JSON
userSchema.set 'toJSON', {virtuals: true}
userSchema.set 'toObject', {virtuals: true}

# Add unique validator
userSchema.plugin uniqueValidator

# Hide private fields on toJSON
userSchema.plugin hidden

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
  console.log @
  console.log @password, input
  bcrypt.compare input, @password, (err, isValid) ->
    return cb(err) if err
    cb null, isValid

# Full name virtual
userSchema.virtual('name.full').get ->
  "#{@name.first} #{@name.last}"

# Get the user's top 10 scores
userSchema.methods.getPersonalScores = (cb) ->
  Score
    .find _player: @_id
    .sort '-score'
    .limit 10
    .exec (err, scores) ->
      return cb err if err
      cb null, scores

# Get the user's personal best score
userSchema.methods.getPersonalBest = (cb) ->
  Score
    .find _player: @_id
    .sort '-score'
    .limit 1
    .exec (err, scores) ->
      return cb err if err
      cb null, scores[0]

# Get the user's current rank
userSchema.methods.getRank = (cb) ->
  @getPersonalBest (err, score) ->
    return cb err if err
    Score
      .distinct '_player', score: $gte: score.score
      .exec (err, scores) ->
        return cb err if err
        cb null, scores.length


module.exports = mongoose.model 'User', userSchema
