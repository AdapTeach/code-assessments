var Q = require('q');

var ideone = require('./../ideone'),
    submissions = require('./submissions');

var helloWorld = {};

helloWorld.submit = function (code) {
    return ideone.createSubmission(code)
        .then(waitForFiveSeconds)
        .then(getResult);
};

var getResult = function (submission) {
    var deferred = Q.defer();
    var submissionId = submission[0].return.item[1].value.$value;
//    var finished = false;
//    var ch
    submissions.checkFinished(submissionId).then(function (finished) {
        if (finished) {
            deferred.resolve({passed: true});
//            var output = result[0].return.item[11].value.$value;
//            if (output === 'Hello, World !') {
//                deferred.resolve({pass: true});
//            } else {
//                deferred.resolve({pass: false});
//            }
        } else {
            deferred.resolve({passed: false});
        }
    });
    return deferred.promise;
};

var waitForFiveSeconds = function (promise) {
    return Q.delay(promise, 5000);
};

helloWorld.checkResult = function (submissionId) {
    return ideone.getSubmissionDetails(submissionId);
};

module.exports = helloWorld;