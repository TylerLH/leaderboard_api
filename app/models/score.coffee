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
  metadata:
    average_pattern_duration: Number
    pattern_attempts: Number
    pattern_matches: Number
    average_reaction_duration: Number
    reaction_attempts: Number

scoreSchema.plugin hidden

module.exports = mongoose.model 'Score', scoreSchema