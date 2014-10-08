var express = require('express'),
    router = express.Router();

var ideone = require('./ideone');

router.get('/getLanguages', function (req, res) {
    ideone.getLanguages().then(function (languages) {
        res.send(languages);
    });
});

router.post('/createSubmission', function (req, res) {
    ideone.createSubmission().then(function (submission) {
        res.send(submission);
    });
});

module.exports = router;
