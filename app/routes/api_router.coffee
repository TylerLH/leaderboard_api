{Router}        = require 'express'
router          = new Router
passport        = require 'passport'
{BasicStrategy} = require 'passport-http'
User            = require '../models/user'
Score           = require '../models/score'

# Verify username/password for user
verify = (username, password, next) ->
  User.findOne username: username, (err, user) ->
    return next(err) if err
    return next(null, false) unless user?
    user.comparePassword password, (err, isValid) ->
      return next(err) if err
      return next(null, false) unless isValid
      next(null, user)

passport.use new BasicStrategy verify
authenticate = passport.authenticate 'basic', session: false

# POST /api/register
# Register new user
router.post '/register', (req, res) ->
  user = new User req.body
  user.save (err, user) ->
    return res.status(400).json err if err
    res.json user

# POST /api/authenticate
# Authenticate username/password combination
router.post '/authenticate', (req, res) ->
  User.findOne username: req.body.username, (err, user) ->
    return res.sendStatus 500 if err
    return res.sendStatus 401 unless user
    user.comparePassword req.body.password, (err, isValid) ->
      if err?
        return res.status(500).json error: "There was an error logging in."
      unless isValid?
        return res.status(401).json error: "Invalid username or password."
      res.json user

# POST /api/scores
# Save a score to db
router.post '/scores', authenticate, (req, res) ->
  score = new Score req.body
  score._player = req.user._id
  score.save (err) ->
    return res.sendStatus 500 if err?
    User.find().count (err, totalPlayers) ->
      req.user.getRank (err, rank) ->
        return res.sendStatus 500 if err?
        res.json rank: rank, total_players: totalPlayers

# GET /api/scores/top
# Returns the top 10 scores
router.get '/scores/top', authenticate, (req, res) ->
  Score
    .find()
    .populate '_player', 'name username'
    .sort '-score'
    .limit 10
    .exec (err, scores) ->
      return res.sendStatus 500 if err
      res.json scores

# GET /api/scores/personal_best
# Returns best score for current user
router.get '/scores/personal_best', authenticate, (req, res) ->
  req.user.getPersonalBest (err, score) ->
    return res.json err if err
    return res.sendStatus 200 unless score
    res.json score

# GET /api/rank
# Get the user's current rank
router.get '/rank', authenticate, (req, res) ->
  req.user.getRank (err, rank) ->
    return res.sendStatus 500 if err
    res.json rank: rank


module.exports = router