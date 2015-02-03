var _ = require('lodash');

var Language = require('../assessment/Language');

var user = {
    id: 579523214567894,
    username: 'test_user'
};

var assessment = {
    id: 1365479523,
    title: 'Assessment',
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

var TestValue = {

    loggedUser: function (properties) {
        return cloneWith(user, properties);
    },

    assessment: function (properties) {
        return cloneWith(assessment, properties);
    },
    unsavedAssessment: function (properties) {
        return cloneUnsavedWith(assessment, properties);
    }

};

function cloneWith(original, properties) {
    var clone = _.cloneDeep(original);
    for (var prop in properties)
        clone[prop] = properties[prop];
    return clone;
}

function cloneUnsavedWith(original, properties) {
    var clone = cloneWith(original, properties);
    delete clone.id;
    return clone;
}

module.exports = TestValue;