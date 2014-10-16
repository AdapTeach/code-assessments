var Q = require('q');

var ideone = require('./../ideone');

var submissions = {};

var MAX_ATTEMPTS = 15;

submissions.submit = function (assessment, code) {
    return ideone.createSubmission(code)// TODO Supplement code for specific assessment
        .then(waitUntilFinishedAndGetResult);
};

var waitUntilFinishedAndGetResult = function (submissionId) {
    console.log('Waiting until finished...');
    var deferred = Q.defer();
    setTimeout(getResultIfFinishedOrTryLater(submissionId, MAX_ATTEMPTS, deferred), 1000);
    return deferred.promise;
};

var getResultIfFinishedOrTryLater = function (submissionId, remainingAttempts, deferred) {
    console.log('Remaining attempts : ' + remainingAttempts + '...');
    return function () {
        if (remainingAttempts > 0) {
            checkFinished(submissionId).then(function (finished) {
                if (finished) {
                    console.log('Finished !');
                    getResult(submissionId).then(function (result) {
                        deferred.resolve(result);
                    });
                } else {
                    setTimeout(getResultIfFinishedOrTryLater(submissionId, remainingAttempts - 1, deferred), 1000);
                }
            });
        } else {
            deferred.reject('Failed ' + MAX_ATTEMPTS + ' times, aborting');
        }
    };
};

var checkFinished = function (submissionId) {
    console.log('Checking if finished...');
    return ideone.getSubmissionStatus(submissionId).then(function (status) {
        return status === '0'; // Status 0 means submitted code execution is finished
    });
};

var getResult = function (submissionId) {
    return checkFinished(submissionId).then(function (finished) {
        return {passed: finished};
    });
};


module.exports = submissions;