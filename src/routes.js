var express = require('express'),
    router = express.Router(),
    soap = require('soap');

var credentials = require('../config/credentials');

router.get('/languages', function (req, res) {
    soap.createClient('http://ideone.com/api/1/service.wsdl', function (err, client) {
        var params = {
            user: credentials.user,
            pass: credentials.pass,
            sourceCode: 'appServer',
            language: 10,
            input: '',
            run: false,
            private: true
        };
        client.getLanguages(params, function (error, result) {
            res.send(result.return.item[1].value.item);
        });
    });
});

module.exports = router;
