gulp  = require 'gulp'
$     = do require 'gulp-load-plugins'

paths =
  styles:
    src: './app/assets/styles/app.scss'
    dest: './app/public'

gulp.task 'styles', ->
  gulp.src paths.styles.src
    .pipe $.sass()
    .pipe $.autoprefixer()
    .pipe gulp.dest paths.styles.dest