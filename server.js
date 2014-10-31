'use strict';
Array.prototype.move = function(from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};
require('./config/init')();
var config = require('./config/config'),
    mongoose = require('mongoose-q')(),
    db = mongoose.connect(config.dbUrl,{
        user : config.dbRoot,
        pass : config.dbPassword
    });
var app = require('./config/express')(db);
app.listen(config.port,config.address);
console.log('CodeAssessments api started on port ' + config.port);
