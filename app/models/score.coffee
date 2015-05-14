mongoose = require 'mongoose'
hidden   = do require 'mongoose-hidden'

scoreSchema = new mongoose.Schema
  _player:
    type: mongoose.Schema.Types.ObjectId
    ref: 'User'
  score:
    type: Number
    required: 'Score is required'
    index: true
  rating:
    type: Number
    min: 1
    max: 5
  metadata:
    average_pattern_duration: Number
    pattern_attempts: Number
    pattern_matches: Number
    average_reaction_duration: Number
    reaction_attempts: Number

scoreSchema.statics.getLeaderboard = (cb) ->
  @find()
  .populate '_player', 'name username'
  .sort '-score'
  .limit 10
  .exec (err, scores) ->
    return cb err if err?
    cb null, scores

# scoreSchema.plugin hidden

module.exports = mongoose.model 'Score', scoreSchema