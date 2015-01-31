var _ = require('lodash');

var Language = require('../assessment/Language');

var existingUser = {
    id: 579523214567894,
    username: 'test_user'
};

var unsavedAssessment = {
    title: 'Created Assessment',
    language: Language.JAVA,
    instructions: 'none',
    providedCompilationUnits: [],
    compilationUnitsToSubmit: [
        // TODO Add one
    ],
    tests: [
        // TODO Add one
    ]
};

var savedAssessment = _.cloneDeep(unsavedAssessment);
savedAssessment.id = 1365479523;

var TestValue = {

    user: existingUser,

    assessment: savedAssessment,
    unsavedAssessment: unsavedAssessment

};

module.exports = TestValue;