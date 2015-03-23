var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    jasmine = require('gulp-jasmine'),
    mocha = require('gulp-mocha'),
    nodemon = require('gulp-nodemon');

var pathToSrc = ['config/**/*.js', 'src/**/*.js'],
    pathToUnitTests = 'src/**/*.spec.js',
    pathToAcceptanceTests = 'src/**/*.supertest.js';

gulp.task('default', ['dev'], function () {
});

gulp.task('dev', ['lint'], function () {
    nodemon({
        script: 'server.js',
        ext: 'js',
        env: {'NODE_ENV': 'development'}
    })
        .on('change', ['lint']);
});

gulp.task('lint', function () {
    function lint(path) {
        path
            .pipe(jshint({
                strict: false
            }))
            .pipe(jshint.reporter('jshint-stylish'));
    }

    lint(gulp.src(pathToSrc));
    lint(gulp.src('gulpfile.js'));
});

gulp.task('test', ['lint'], function () {
    gulp.src(pathToUnitTests)
        .pipe(jasmine({
            includeStackTrace: true
        }))
        .on('error', function (e) {
            if (e.stack)
                console.error(e.stack);
            else if (e.message != 'Tests failed')
                console.error(e.message);
        });
});

gulp.task('tdd', ['test'], function () {
    gulp.watch(pathToSrc, ['test']);
});

gulp.task('supertest', ['test'], function () {
    gulp.src(pathToAcceptanceTests)
        .pipe(mocha({reporter: 'nyan'}));
});

/////////////////////////////////////
/////////////// PROD ///////////////
///////////////////////////////////

// TODO