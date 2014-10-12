var Q = require('q');

var ideone = require('./../ideone');

var submissions = {};

submissions.submit = function (assessment, code) {
    return ideone.createSubmission(code)// TODO Supplement code for specific assessment
        .then(waitForOneSecond)
        .then(getResult);
};

var waitForOneSecond = function (promise) {
    console.log('Waiting...');
    return Q.delay(promise, 5000);
};

var getResult = function (submissionId) {
    console.log('Getting result for : ' + submissionId);
    return checkFinished(submissionId).then(function (finished) {
        return {passed: finished};
        // TODO
//            if (finished) {
//                return {passed: finished};
//            } else {
//
//            }
    });
};

var waitUntilFinished = function(submissionId) {
    // TODO
    // checkFinished(submissionId).then
};

var checkFinished = function (submissionId) {
    return ideone.getSubmissionStatus(submissionId).then(function (status) {
        return status === '0'; // Status 0 means submitted code execution is finished
    });
};

module.exports = submissions;