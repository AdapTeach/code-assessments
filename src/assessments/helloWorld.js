var Q = require('q');

var ideone = require('./../ideone');

var helloWorld = {};

helloWorld.checkResult = function (submissionId) {
    return ideone.getSubmissionDetails(submissionId);
};

module.exports = helloWorld;