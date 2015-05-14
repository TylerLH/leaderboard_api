dotenv        = require 'dotenv'
dotenv.load()
express       = require 'express'
app           = express()
morgan        = require 'morgan'
bodyParser    = require 'body-parser'
mongoose      = require 'mongoose'
passport      = require 'passport'
handlebars    = require 'express-handlebars'

Score = require './models/score'

# Connect to database and start app server
dbUrl = process.env.MONGODB_URL || process.env.MONGOLAB_URI
mongoose.connect dbUrl, (err) ->
  throw err if err

tmplConfig =
  defaultLayout: 'main'
  layoutsDir: "#{__dirname}/views/layouts"
  extname: '.hbs'

app.engine '.hbs', handlebars tmplConfig
app.set 'view engine', '.hbs'
app.set 'views', "#{__dirname}/views"
app.set 'port', process.env.PORT || 3000

if process.env.NODE_ENV is 'production'
  app.use morgan 'combined'
else
  app.use morgan 'dev'

app.use express.static './app/public'
app.use bodyParser.json()
app.use passport.initialize()

app.get '/', (req, res) ->
  res.render "home"

app.use '/api', require './routes/api_router'

app.listen app.get('port'), ->
  console.log "Server is running on port #{app.get('port')}"
