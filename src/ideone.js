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

ideone.createSubmission = function () {
    var params = {
        user: credentials.user,
        pass: credentials.pass,
        sourceCode: 'some code...',
        language: 10,
        input: '',
        run: false,
        private: true
    };
    return Q.nfcall(client.createSubmission, params);
};

module.exports = ideone;