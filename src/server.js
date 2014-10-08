var express = require('express'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    debug = require('debug')('java-grader');

var routes = require('./routes');

var app = express();
app.set('port', process.env.PORT || 5000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + app.get('port'));
});