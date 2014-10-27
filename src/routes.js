var express = require('express'),
    router = express.Router();

var submissions = require('./submit/submissions'),
    assessments = require('./assessment/routes.ctrl');

router.get('/assessment/:id', function (request, response) {
    response.send(assessments[request.params.id]);
});

router.post('/assessment/:id', function (request, response) {
    var submittedCode = getCode(request, response);
    if (submittedCode !== undefined) {
        submissions.submit(assessments[request.params.id], submittedCode)
            .then(function (submission) {
                response.send({result: buildResult(submission)});
            })
            .catch(function (error) {
                console.error(error);
                response.status(500).send(error);
            });
    }
});

var getCode = function (request, response) {
    var submittedCode = request.body.code;
    if (submittedCode === undefined) {
        response.status(400).send('No code was submitted');
    }
    return submittedCode;
};

var buildResult = function (submission) {
    if (submission.checkOutput()) {
        return {pass: true};
    } else {
        return {
            pass: false,
            cmpinfo: submission.cmpinfo,
            output: submission.output.substring(0, submission.output.lastIndexOf('\n')), // Remove last line from output
            error: submission.error
        };
    }
};

module.exports = router;
