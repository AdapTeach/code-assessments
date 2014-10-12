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

ideone.createSubmission = function (code) {
    var deferred = Q.defer();
    var params = {
        user: credentials.user,
        pass: credentials.pass,
        sourceCode: code,
        language: 10,
        input: '',
        run: true,
        private: true
    };
    client.createSubmission(params, function (error, result) {
        deferred.resolve(result.return.item[1].value.$value);
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
    client.getSubmissionStatus(params, function(error, result) {
        deferred.resolve(result.return.item[1].value.$value);
    });
    return deferred.promise;
};

ideone.getSubmissionDetails = function (submissionId) {
    var params = {
        user: credentials.user,
        pass: credentials.pass,
        link: submissionId,
        withOutput: true,
        withStderr: true,
        withCmpinfo: true,
        withSource: false,
        withInput: false
    };
    return Q.nfcall(client.getSubmissionDetails, params);
};

module.exports = ideone;