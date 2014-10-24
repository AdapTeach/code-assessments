var _ = require('lodash'),
    http = require("q-io/http"),
    allPositive = require('./allPositive'),
    helloWorld = require('./helloWorld');

var assessments = {};

assessments.publish = function (router) {

    router.get('/stubs/helloWorld', function (request, response) {
        console.log('Stubbed helloWorld assessment');
        response.send(helloWorld);
    });

    router.post('/stubs/helloWorld', function (request, response) {
        var submittedCode = request.body.code;
        var options = {
            url: 'http://localhost:5020/v1/',
            method: 'POST',
            body: [
                JSON.stringify({
                    assessment: {
                        title: helloWorld.title,
                        className: helloWorld.className,
                        tests: helloWorld.tests
                    },
                    code: submittedCode
                })
            ]
        };
        http.request(http.normalizeRequest(options))
            .then(function (submissionResponse) {
                submissionResponse.body.read().then(function (body) {
                    console.log(body);
                    response.status(submissionResponse.status).end();
                });
                //response.send(submissionResponse.body);
            });
    });

};

module.exports = assessments;