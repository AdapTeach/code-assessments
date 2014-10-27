'use strict';
Array.prototype.move = function(from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};
require('./config/init')();
var config = require('./config/config'),
    mongoose = require('mongoose-q')(),
    db = mongoose.connect(config.db);
var app = require('./config/express')(db);
app.listen(config.port);
console.log('CodeGrader api started on port ' + config.port);