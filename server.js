'use strict';
Array.prototype.move = function(from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};
require('./config/init')();
var config = require('./config/config');

    //mongoose.connect(config.dbUrl);
var app = require('./config/express')();
app.listen(config.port);
console.log('CodeAssessments api started on port ' + config.port);
