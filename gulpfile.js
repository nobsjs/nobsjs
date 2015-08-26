'use strict';

var gulp = require('gulp');

var jasmine = require('gulp-jasmine');
var jshint = require('gulp-jshint');
var karmaServer = require('karma').Server;
var nodemon = require('gulp-nodemon');

gulp.task('default', ['nodemon']);

gulp.task('test', ['jshint','karma', 'jasmine']);

gulp.task('jasmine', function () {
  return gulp.src('./modules/**/tests/server/**/*.js')
    .pipe(jasmine({
      includeStackTrace: true
    }));
});

gulp.task('jshint', function () {
  return gulp.src(['./gulpfile.js', './modules/**/*.js', './config/**/*.js', './lib/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('karma', function () {
  return new karmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }).start();
});

gulp.task('nodemon', function () {
  nodemon({ script: 'index.js',
            ext: 'html js',
            //ignore: ['ignored.js']
            //tasks: ['lint']
          })
    .on('restart', function () {
      console.log('restarted!');
    });
});
