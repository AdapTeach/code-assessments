var _ = require('lodash'),
    validator = require('validator');

var assessmentIds = [
    'helloWorld',
    'allPositive'
];

var assessments = {};

_.forEach(assessmentIds, function (assessmentId) {
    var assessment = require('./' + assessmentId);
    assessment.id = assessmentId;
    transformStartCode(assessment);
    buildTestMethods(assessment);
    buildMainMethod(assessment);
    validate(assessment);
    assessments[assessmentId] = assessment;
});

function transformStartCode(assessment) {
    assessment.startCode = assessment.startCode.join('\n');
}

function buildTestMethods(assessment) {
    assessment.testMethods = _.map(assessment.tests, function (test, testIndex) {
        return ['static boolean test' + testIndex + '() {',
                '\t' + test.code.join('\n\t\t'),
                '\tboolean passExpectation = (' + test.expectations[0].expression + ');',
            '\tif (!passExpectation) {',
                '\t\tSystem.out.println("Failed test #' + testIndex + ' : ' + test.title + '");',
            '\t}',
            '\treturn passExpectation;',
            '}'
        ].join('\n\t');
    }).join('\n\t\t');
}

function buildMainMethod(assessment) {
    var testCount = assessment.tests.length;
    var mainMethodCode = ['\t\tboolean[] testResults = new boolean[' + testCount + '];'];
    for (var i = 0; i < testCount; i++) {
        mainMethodCode.push('testResults[' + i + '] = test' + i + '();');
    }
    var finalCheck = [
        'boolean pass = true;',
        'for (boolean result : testResults) {',
        '\tif (!result) pass = false;',
        '}',
        'System.out.print(pass);'
    ].join('\n\t\t');
    mainMethodCode.push(finalCheck);
    assessment.mainMethod = mainMethodCode.join('\n\t\t');
}

function validate(assessment) {
    validator.isLength(assessment.id, 2);
    validator.isLength(assessment.title, 2);
    validator.isLength(assessment.instructions, 10);
    validator.contains(assessment.startCode, 'class');
    validator.contains(assessment.mainMethod, 'System.out.print');
    // TODO Validate tests
}

module.exports = assessments;