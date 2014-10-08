var express = require('express'),
    router = express.Router();

var ideone = require('./ideone'),
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
    var assessment = assessments.helloWorld;
    assessment.submit('class Program {    public static void main (String[] args) {      System.out.println("Hello, World !");  }}')
        .then(function (submission) {
            console.log(submission);
            if (submission.passed) {
                res.send({passed: true});
            } else {
                res.send({passed: false});
            }
        })
        .catch(function(error){
            console.log(error);
        });
});

module.exports = router;
