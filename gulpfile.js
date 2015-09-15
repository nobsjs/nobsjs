'use strict';

var gulp = require('gulp');

var concat = require('gulp-concat');
var coveralls = require('gulp-coveralls');
var exec = require('child_process').exec;
var istanbul = require('gulp-istanbul');
var jasmine = require('gulp-jasmine');
var jshint = require('gulp-jshint');
var karmaServer = require('karma').Server;
var ngAnnotate = require('gulp-ng-annotate');
var nodemon = require('gulp-nodemon');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');

var isWatching = false;

var config = {};

gulp.task('default', ['nodemon']);

gulp.task('prod', function (done) {
  runSequence('env:prod', 'loadConfig', 'uglify', 'nodemon');
});

gulp.task('test', function (done) {
  runSequence('env:test', 'loadConfig', 'jshint','karma', 'jasmine', done);
});

gulp.task('test:ci', function (done) {
  runSequence('env:test', 'loadConfig', 'jshint','karma', 'jasmine', 'mv', 'coveralls', done);
});

gulp.task('test:client', function (done) {
  runSequence('env:test', 'loadConfig', 'jshint', 'karma', done);
});

gulp.task('test:server', function (done) {
  runSequence('env:test', 'loadConfig', 'jshint', 'jasmine', done);
});

gulp.task('loadConfig', function () {
  config = require('./lib/config');
});

gulp.task('env:prod', function () {
  process.env.NODE_ENV = 'production';
});

gulp.task('env:test', function () {
  process.env.NODE_ENV = 'test';
});

gulp.task('mv', function (done) {
  exec('mv coverage/PhantomJS\ 1.9.8\ \(Mac\ OS\ X\ 0.0.0\)/ coverage/phantom/', function () {
    done();
  });
});

gulp.task('coveralls', function () {
  return gulp.src(['coverage/**/lcov.info'])
    .pipe(coveralls());
});

gulp.task('jasmine', function (done) {
  gulp.src(['modules/**/server/**/*.js', 'lib/**/*.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', function () {
      gulp.src(config.files.server.tests)
        .pipe(jasmine({
          includeStackTrace: true
        }))
        .pipe(istanbul.writeReports({
          reporters: ['html']
        }))
        .on('end', done);
      });
});

gulp.task('jshint', function () {
  return gulp.src(['./gulpfile.js', './modules/**/*.js', './config/**/*.js', './lib/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('karma', function (done) {
  return new karmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('nodemon', function () {
  isWatching = true;
  nodemon({ script: 'index.js',
            ext: 'html js',
            //ignore: ['ignored.js']
            //tasks: ['lint']
          })
    .on('restart', function () {
      console.log('restarted!');
    });

});

// JS minifying task
gulp.task('uglify', function () {
  return gulp.src(config.files.client.js)
    .pipe(ngAnnotate())
    .pipe(uglify({
      mangle: true
    }))
    .pipe(concat('application.min.js'))
    .pipe(gulp.dest('public/dist'));
});

// THIS SECTION IS A WORK AROUND FOR GULP HANGING AT THE END OF TESTS
/*
//REFERENCE THIS CODE IF WE BEGIN USING ANY WATCHES
gulp.task('watch', [....], function() {
  isWatching = true;
 .... ...
});
*/
gulp.on('stop', function() {
    if (!isWatching) {
        process.nextTick(function() {
            process.exit(0);
        });
    }
});
