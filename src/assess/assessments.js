var _ = require('lodash'),
    validator = require('validator');

var assessmentIds = [
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
    validator.isLength(assessment.id, 2);
    validator.isLength(assessment.title, 2);
    validator.isLength(assessment.instructions, 10);
    validator.contains(assessment.startCode, 'class');
    validator.contains(assessment.mainMethod, 'System.out.print');
    validator.isLength(assessment.expectedOutput, 1);
};

_.forEach(assessmentIds, function (assessmentId) {
    var assessment = require('./' + assessmentId);
    assessment.id = assessmentId;
    transformMainMethod(assessment);
    transformStartCode(assessment);
    validate(assessment);
    assessments[assessmentId] = assessment;
});

module.exports = assessments;