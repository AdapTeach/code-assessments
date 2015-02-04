var _ = require('lodash');

var ProgrammingLanguage = require('../entity/ProgrammingLanguage');
var InMemoryUserGateway = require('../core/gateway/InMemoryUserGateway.mock');
var InMemoryAssessmentGateway = require('../core/gateway/InMemoryAssessmentGateway.mock');

var user = {
    id: 579523214567894,
    username: 'stub_user'
};

var assessment = {
    id: 1365479523,
    title: 'Stub Assessment',
    language: ProgrammingLanguage.JAVA,
    instructions: 'Stub instruction',
    providedCompilationUnits: [],
    compilationUnitsToSubmit: [
        // TODO Add one
    ],
    tests: [
        // TODO Add one
    ]
};

var Stubs = {

    registeredUser: entityFactory(user),
    unregisteredUser: unsavedEntityFactory(user),
    assessment: entityFactory(assessment),
    unsavedAssessment: unsavedEntityFactory(assessment),

    userGateway: gatewayFactory(InMemoryUserGateway),
    assessmentGateway: gatewayFactory(InMemoryAssessmentGateway)

};

function gatewayFactory(Gateway) {
    return function () {
        var gateway = new Gateway();
        gateway.addSpies();
        return gateway;
    };
}

function entityFactory(original) {
    return function (properties) {
        return cloneWith(original, properties);
    };
}

function unsavedEntityFactory(original) {
    return function (properties) {
        return cloneUnsavedWith(original, properties);
    };
}

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

module.exports = Stubs;