var gulp = require('gulp')
var notify = require('gulp-notify')
var rename = require('gulp-rename')
var rsync = require('gulp-rsync')
var browserSync = require('browser-sync').create()
var stylus = require('gulp-stylus')
var htmlmin = require('gulp-htmlmin')
var pump = require('pump')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var headerfooter = require('gulp-headerfooter')

// ----------------------------------------------------------------
// ADD HEADER & FOOTER
// ----------------------------------------------------------------
gulp.task('headerfooter', function () {
  gulp.src(['./src/**/*.html', '!./src/partials/**/*.html'])
    .pipe(headerfooter.header('./src/partials/header.html'))
    .pipe(headerfooter.footer('./src/partials/footer.html'))
    .pipe(gulp.dest('./build/'))
})

// ----------------------------------------------------------------
// DEPLOY TO SERVER
// ----------------------------------------------------------------
gulp.task('deploy', function () {
  gulp.src('build/**')
    .pipe(rsync({
      root: 'build',
      hostname: 'ssh.iamthanh.com',
      username: 'iamthanh.com',
      progress: true,
      destination: '/www/refugeeswork'
    })
      .pipe(notify({message: 'Deployed!'}))
  )
})

// ----------------------------------------------------------------
// STYLUS
// ----------------------------------------------------------------
gulp.task('stylus', function () {
  return gulp.src('./src/stylus/*.styl')
    .pipe(stylus({compress: true}))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream())
})

// ----------------------------------------------------------------
// CSS
// ----------------------------------------------------------------
gulp.task('css', function () {
  return gulp.src('./src/css/*.css')
    // .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream())
})

// ----------------------------------------------------------------
// HTML
// ----------------------------------------------------------------
gulp.task('html', function () {
  return gulp.src(['src/**/*.html', '!src/partials/**/*.html'])
    .pipe(headerfooter.header('src/partials/header.html'))
    .pipe(headerfooter.footer('src/partials/footer.html'))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build'))
    .pipe(browserSync.stream())
})

// ----------------------------------------------------------------
// JAVASCRIPT
// ----------------------------------------------------------------
gulp.task('js', function (cb) {
  pump([
    gulp.src('src/js/*.js'),
    concat('bundle.min.js'),
    uglify(),
    gulp.dest('build/js'),
    browserSync.stream()
  ],
    cb
  )
})

// ----------------------------------------------------------------
// BROWSER-SYNC (STATIC SERVER)
// ----------------------------------------------------------------
gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: './build'
    }
  // proxy: {
  //  host: 'dev/',
  //  port: '80'
  // }
  })
  gulp.watch('src/**/*.html', ['html'])
  gulp.watch('src/stylus/**/*.styl', ['stylus'])
  gulp.watch('src/js/**/*.js', ['js'])
  gulp.watch('src/css/**/*.css', ['css'])
})

// ----------------------------------------------------------------
// SET DEFAULT TASK
// ----------------------------------------------------------------
gulp.task('default', ['browser-sync'], function () {})
