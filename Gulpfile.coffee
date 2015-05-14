gulp    = require 'gulp'
$       = do require 'gulp-load-plugins'
assign  = require 'object-assign'
source  = require 'vinyl-source-stream'
watchify = require 'watchify'
browserify = require 'browserify'

paths =
  scripts:
    src: './app/assets/scripts/app.js'
    dest: './app/public'
  styles:
    src: './app/assets/styles/app.scss'
    dest: './app/public'

gulp.task 'styles', ->
  gulp.src paths.styles.src
    .pipe $.sass()
    .pipe $.autoprefixer()
    .pipe gulp.dest paths.styles.dest

customOpts =
  entries: [paths.scripts.src]
  debug: true

opts = assign {}, watchify.args, customOpts

bundler = watchify browserify(opts)

bundle = ->
  bundler
    .bundle()
    .on 'error', $.util.log.bind $.util, 'browserify error'
    .pipe source 'bundle.js'
    .pipe gulp.dest paths.scripts.dest

gulp.task 'scripts', bundle

gulp.task 'dev', ['scripts', 'styles'], ->
  bundler.on 'update', bundle
  bundler.on 'log', $.util.log
  gulp.watch './app/assets/styles/**/*', ['styles']