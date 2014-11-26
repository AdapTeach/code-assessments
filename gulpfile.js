var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    jasmine = require('jasmine-node'),
    nodemon = require('gulp-nodemon');

var pathToSrc = ['config/**/*.js', 'src/**/*.js', 'gulpfile.js'],
    pathToTests = 'test/';

gulp.task('default', ['dev'], function () {
});

gulp.task('dev', function () {
    nodemon({script: 'server.js'})
        .on('change', ['lint']);
});

gulp.task('lint', function () {
    gulp.src(pathToSrc)
        .pipe(jshint({
            strict: false
        }))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', function () {
    gulp.src(pathToTests)
        .pipe(jasmine());
});

/////////////////////////////////////
/////////////// PROD ///////////////
///////////////////////////////////

// TODO