var express = require('express'),
    router = express.Router();

var ideone = require('./ideone'),
    submissions = require('./submit/submissions'),
    assessments = require('./assess/assessments');

router.get('/getLanguages', function (request, response) {
    ideone.getLanguages().then(function (languages) {
        response.send(languages);
    });
});

router.post('/testSubmission', function (request, response) {
    ideone.createSubmission().then(function (submission) {
        response.send(submission);
    });
});

// STUBS

router.get('/assessment/failStub', function (request, response) {
    var failStubAssessment = {
        id: 'failStub',
        instructions: 'Stubbed instructions',
        startCode: 'Stubbed Start Code'
    };
    response.send(failStubAssessment);
});

router.post('/assessment/failStub', function (request, response) {
    var sendResult = function () {
        response.send({
            result: {
                pass: false,
                cmpinfo: 'Main.java:7: error: cannot find symbol\n' +
                    'System.out.println(assessment());\n' +
                    'symbol:   method assessment()\n' +
                    'location: class HelloWorldAssessment\n' +
                    '1 error',
                output: 'Some arbitrary output',
                error: 'OK'
            }
        });
    };
    setTimeout(sendResult, 500);
});

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
