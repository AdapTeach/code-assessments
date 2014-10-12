var express = require('express'),
    router = express.Router();

var ideone = require('./ideone'),
    submissions = require('./assessments/submissions'),
    assessments = require('./assessments/assessments');

router.get('/getLanguages', function (req, res) {
    ideone.getLanguages().then(function (languages) {
        res.send(languages);
    });
});

router.post('/testSubmission', function (req, res) {
    ideone.createSubmission().then(function (submission) {
        res.send(submission);
    });
});

router.post('/helloWorld', function (req, res) {
    submissions.submit(assessments.helloWorld, 'class Program {    public static void main (String[] args) {      System.out.println("Hello, World !");  }}')
        .then(function (result) {
            res.send({result: result});
//            console.log(result);
//            if (result.passed) {
//            } else {
//            }
        })
        .catch(function (error) {
            console.log(error);
        });
});

module.exports = router;
