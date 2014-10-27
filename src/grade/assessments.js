var http = require("q-io/http");

var assessments = {};

var data = {};

var DATA_URL = 'https://dl.dropboxusercontent.com/u/1278945/code-grader/assessments-java.json';

var loadData = function () {
    var options = {
        url: DATA_URL,
        method: 'GET'
    };
    http.request(options)
        .then(function (response) {
            response.body.read().then(function (body) {
                var newData = {};
                JSON.parse(body).assessments.forEach(function (assessment) {
                    newData[assessment.id] = assessment;
                });
                data = newData;
            });
        });
};

loadData();

assessments.get = function (assessmentId) {
    return data[assessmentId];
};

module.exports = assessments;
