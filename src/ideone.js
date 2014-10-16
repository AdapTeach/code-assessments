var soap = require('soap');
var Q = require('q');

var credentials = require('../config/credentials');

var ideone = {};
var client;

soap.createClient('http://ideone.com/api/1/service.wsdl', function (err, result) {
    client = result;
});

ideone.getLanguages = function () {
    var deferred = Q.defer();
    var params = {
        user: credentials.user,
        pass: credentials.pass
    };
    client.getLanguages(params, function (error, result) {
        deferred.resolve(result.return.item[1].value.item);
    });
    return deferred.promise;
};

ideone.createSubmission = function (submission) {
    var deferred = Q.defer();
    var params = {
        user: credentials.user,
        pass: credentials.pass,
        sourceCode: submission.executableCode,
        language: 10,
        input: '',
        run: true,
        private: true
    };
    client.createSubmission(params, function (error, result) {
        submission.id = result.return.item[1].value.$value;
        deferred.resolve(submission);
    });
    return deferred.promise;
};

ideone.getSubmissionStatus = function (submissionId) {
    var deferred = Q.defer();
    var params = {
        user: credentials.user,
        pass: credentials.pass,
        link: submissionId
    };
    client.getSubmissionStatus(params, function (error, result) {
        deferred.resolve(result.return.item[1].value.$value);
    });
    return deferred.promise;
};

ideone.getSubmissionDetails = function (submission) {
    var deferred = Q.defer();
    var params = {
        user: credentials.user,
        pass: credentials.pass,
        link: submission.id,
        withOutput: true,
        withStderr: true,
        withCmpinfo: true,
        withSource: false,
        withInput: false
    };
    client.getSubmissionDetails(params, function (error, result) {
        submission.error = result.return.item[0].value.$value;
        submission.output = result.return.item[11].value.$value;
        submission.stderr = result.return.item[12].value.$value;
        submission.cmpinfo = result.return.item[13].value.$value;
        deferred.resolve(submission);
    });
    return deferred.promise;
};

module.exports = ideone;