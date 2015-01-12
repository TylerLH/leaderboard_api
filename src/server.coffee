dotenv        = require 'dotenv'
dotenv.load()
express       = require 'express'
app           = express()
morgan        = require 'morgan'
bodyParser    = require 'body-parser'
mongoose      = require 'mongoose'
passport      = require 'passport'
# Connect to database and start app server
mongoose.connect process.env.MONGODB_URL

app.set 'port', process.env.PORT || 3000

app.use morgan 'combined'
app.use bodyParser.json()
app.use passport.initialize()

app.get '/', (req, res) ->
  res.send "Welcome to Hands@Work!"
  
app.use '/api', require './routes/api_router'

app.listen app.get('port'), ->
  console.log "Server is running on port #{app.get('port')}"