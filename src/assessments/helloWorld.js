var Q = require('q');

var ideone = require('./../ideone'),
    submissions = require('./submissions');

var helloWorld = {};

var getResult = function (submission) {
    console.log('Fetching result...');
    var deferred = Q.defer();
    var submissionId = submission[0].return.item[1].value.$value;
//    var finished = false;
//    var ch
    submissions.checkFinished(submissionId).then(function (finished) {
        console.log('Checking submission...' );
        if (finished) {
//            var output = result[0].return.item[11].value.$value;
//            if (output === 'Hello, World !') {
//                deferred.resolve({pass: true});
//            } else {
//                deferred.resolve({pass: false});
//            }
        } else {
            deferred.resolve({pass: false});
        }
    });
    return deferred.promise;
};

var waitForFiveSeconds = function (promise) {
    console.log('Waiting...');
    return Q.delay(promise, 1000);
};

helloWorld.submit = function (code) {
    console.log('Submitted...');
    return ideone.createSubmission(code)
        .then(waitForFiveSeconds)
        .then(getResult);
};

helloWorld.checkResult = function (submissionId) {
    return ideone.getSubmissionDetails(submissionId);
};

module.exports = helloWorld;