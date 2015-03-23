'use strict';
require('./config/init')();
var config = require('./config/config'),
    mongoose = require('mongoose-q')(),
    db = mongoose.connect(config.db.address, {
        user: config.db.user,
        pass: config.db.pass
    });
require('./config/express')(db).listen(config.port, config.address);
console.log('\x1b[7m', 'CodeAssessments api started on port ' + config.port);
