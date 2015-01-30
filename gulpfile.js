var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    jasmine = require('gulp-jasmine'),
    nodemon = require('gulp-nodemon');

var pathToSrc = ['config/**/*.js', 'src/**/*.js'],
    pathToTests = 'src/**/*.spec.js';

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
    gulp.src(pathToTests)
        .pipe(jasmine())
        .on('error', function (e) {
            console.error('Error running tests');
            if (e.stack)
                console.error(e.stack);
            else
                console.error(e.message);
        });
});

gulp.task('tdd', ['test'], function () {
    gulp.watch(pathToSrc, ['test']);
});

/////////////////////////////////////
/////////////// PROD ///////////////
///////////////////////////////////

// TODO