var _ = require('lodash'),
    assessmentData = require('./assessments'),
    http = require("q-io/http");

var assessments = {};

assessments.publish = function (router) {

    router.get('/stubs/:assessmentId', function (request, response) {
        var assessment = require('./' + request.params.assessmentId);
        response.send(assessment);
    });

    router.post('/stubs/:assessmentId', function (request, response) {
        var assessment = require('./' + request.params.assessmentId);
        var submittedCode = request.body.code;
        var options = {
            url: 'http://localhost:5020/v1/',
            method: 'POST',
            body: [
                JSON.stringify({
                    assessment: {
                        title: assessment.title,
                        className: assessment.className,
                        tests: assessment.tests
                    },
                    code: submittedCode
                })
            ]
        };
        http.request(http.normalizeRequest(options))
            .then(function (submissionResponse) {
                submissionResponse.body.read().then(function (body) {
                    response
                        .status(submissionResponse.status)
                        .send(body);
                });
            });
    });

};

module.exports = assessments;