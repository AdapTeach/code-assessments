var config = require('../../config/config'),
    http = require('q-io/http'),
    authVerifier = {};

authVerifier.verify = function (assertion) {
    var options = {
        url: config.authUrl+'/login',
        method: 'POST',
        body: [
            JSON.stringify({
                assertion: assertion,
                audience: 'http://localhost:5000'
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
    var options = {
        url: config.authUrl + '/me',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorisation': 'Bearer ' + token
        }
    };
    return http.request(options)
        .then(function (verificationResult) {
            return verificationResult.body.read();
        });
};

module.exports = authVerifier;