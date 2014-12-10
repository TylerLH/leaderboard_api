{Router}        = require 'express'
router          = new Router
passport        = require 'passport'
{BasicStrategy} = require 'passport-http'
User            = require '../models/user'
params          = require 'params'

# Verify username/password for user
verify = (username, password, next) ->
  User.findOne username: username, (err, user) ->
    return next(err) if err
    return next(null, false) unless user?
    user.comparePassword password, (err, isValid) ->
      return next(err) if err
      next null, isValid

passport.use new BasicStrategy verify
authenticate = passport.authenticate 'basic', session: false

# POST /api/register
# Register new user
router.post '/register', (req, res) ->
  user = new User req.body
  user.save (err, user) ->
    return res.status(403).json err if err
    res.json user

# POST /api/authenticate
# Authenticate username/password combination
router.post '/authenticate', (req, res) ->
  verify req.body.username, req.body.password, (err, isValid) ->
    return res.sendStatus 500 if err
    return res.sendStatus 401 unless isValid
    res.sendStatus 200

module.exports = router