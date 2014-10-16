var _ = require('lodash'),
    validator = require('validator');

var assessmentNames = [
    'helloWorld'
];

var assessments = {};

var transformStartCode = function (assessment) {
    assessment.startCode = assessment.startCode.join('\n');
};

var transformMainMethod = function (assessment) {
    assessment.mainMethod = assessment.mainMethod.join('\n\t\t');
};

var validate = function (assessment) {
    validator.isLength(assessment.instructions, 10);
    validator.contains(assessment.startCode, 'class');
    validator.contains(assessment.mainMethod, 'System.out.print');
    validator.isLength(assessment.expectedOutput, 1);
};

_.forEach(assessmentNames, function (assessmentName) {
    var assessment = require('./' + assessmentName);
    transformMainMethod(assessment);
    transformStartCode(assessment);
    validate(assessment);
    assessments[assessmentName] = assessment;
});

module.exports = assessments;