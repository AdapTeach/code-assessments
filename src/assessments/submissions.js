var Q = require('q');

var ideone = require('./../ideone');

var submissions = {};

submissions.checkFinished = function (submissionId) {
    var deferred = Q.defer();
    ideone.getSubmissionStatus(submissionId).then(function (result) {
        var status = result[0].return.item[1].value.$value;
        deferred.resolve(status === '0'); // Status 0 means submitted code execution is finished
    });
    return deferred.promise;
};

module.exports = submissions;