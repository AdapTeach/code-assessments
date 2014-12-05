var config = require('../../config/config'),
    http = require('q-io/http'),
    q = require('q'),
    authVerifier = {};

authVerifier.verify = function (assertion) {
    var options = {
        url: config.authUrl+'/login',
        method: 'POST',
        body: [
            JSON.stringify({
                assertion: assertion,
                audience: config.clientUrl
            })
        ],
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return http.request(options)
        .then(function (verificationResult) {
            return verificationResult.body.read().then(function (body) {
                return JSON.parse(body);
            });
        });
};

authVerifier.decodeToken = function (token) {
    var deferred = q.defer();
    var options = {
        url: config.authUrl + '/me',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };
    console.log('decodeToken pre');
    http.request(options)
        .then(function (verificationResult) {
            verificationResult.body.read().then(function (body) {
                console.log('verify result', body);
                deferred.resolve(JSON.parse(body));
            });
        }).catch(function(err){
           deferred.reject(err);
        });
    return deferred.promise;
};

module.exports = authVerifier;