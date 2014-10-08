var list = [
    'helloWorld'
];

var assessments = {};

for (var i = 0; i < list.length; i++) {
    var assessmentName = list[i];
    assessments[assessmentName] = require('./' + assessmentName);
}

module.exports = assessments;