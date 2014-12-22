var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    jasmine = require('gulp-jasmine'),
    nodemon = require('gulp-nodemon');

var pathToSrc = ['config/**/*.js', 'src/**/*.js', 'gulpfile.js'],
    pathToTests = 'test/**/*';

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
    gulp.src(pathToSrc)
        .pipe(jshint({
            strict: false
        }))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', ['lint'], function () {
    gulp.src(pathToTests)
        .pipe(jasmine());
});

/////////////////////////////////////
/////////////// PROD ///////////////
///////////////////////////////////

// TODO