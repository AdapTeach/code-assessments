var express = require('express'),
    router = express.Router();

var ideone = require('./ideone'),
    submissions = require('./assessments/submissions'),
    assessments = require('./assessments/assessments');

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

router.post('/helloWorld', function (request, response) {
    var submittedCode = getCode(request, response);
    if (submittedCode !== undefined) {
        submissions.submit(assessments.helloWorld, submittedCode)
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
    if (submission.checkCorrectOutput()) {
        return {pass: true};
    } else {
        return {
            pass: false
            // TODO Add useful info
        };
    }
};

module.exports = router;
