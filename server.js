'use strict';

require('./config/init')();
var config = require('./config/config'),
    mongoose = require('mongoose-q')(),
    db = mongoose.connect(config.db);
var app = require('./config/express')(db);
app.listen(config.port);
console.log('CodeGrader api started on port ' + config.port);