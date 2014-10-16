var Q = require('q');

var ideone = require('./../ideone');
var Submission = require('./Submission');

var submissions = {};

var MAX_ATTEMPTS = 30;

submissions.submit = function (assessment, submittedCode) {
    var submission = new Submission(assessment, submittedCode);
    return ideone.createSubmission(submission)
        .then(waitUntilFinishedAndGetResult);
};

var waitUntilFinishedAndGetResult = function (submission) {
    console.log('Waiting until finished...');
    var deferred = Q.defer();
    setTimeout(getResultIfFinishedOrTryLater(submission, MAX_ATTEMPTS, deferred), 1000);
    return deferred.promise;
};

var getResultIfFinishedOrTryLater = function (submission, remainingAttempts, deferred) {
    console.log('Remaining attempts : ' + remainingAttempts + '...');
    return function () {
        if (remainingAttempts > 0) {
            checkFinished(submission).then(function (finished) {
                if (finished) {
                    console.log('Finished !');
                    getResult(submission).then(function () {
                        deferred.resolve(submission);
                    }).catch(function (error) {
                        deferred.reject(error);
                    });
                } else {
                    setTimeout(getResultIfFinishedOrTryLater(submission, remainingAttempts - 1, deferred), 1000);
                }
            });
        } else {
            deferred.reject('Failed after ' + MAX_ATTEMPTS + ' attempts, aborting');
        }
    };
};

var checkFinished = function (submission) {
    console.log('Checking if finished...');
    return ideone.getSubmissionStatus(submission.id).then(function (status) {
        return status === '0'; // Status 0 means submitted code execution is finished
    });
};

var getResult = function (submission) {
    console.log('Getting result...');
    return ideone.getSubmissionDetails(submission).then(function () {
        return submission;
    });
};


module.exports = submissions;