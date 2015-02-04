var GetAssessmentInteractor = require('./GetAssessmentInteractor');
var Stubs = require('../util/Stubs.mock');
var Errors = require('../error/Errors');

describe('GetAssessmentInteractor', function () {

    var interactor,
        gateway,
        action;

    beforeEach(function () {
        gateway = Stubs.assessmentGateway();
        interactor = new GetAssessmentInteractor(gateway);
        action = {};
    });

    function execute() {
        return interactor.execute(action);
    }

    function failIfCalled() {
        expect('function').toBe('not called');
    }

    function expectError(expectedType) {
        return function (error) {
            expect(error.type).toBe(expectedType);
        };
    }

    it('reacts with ' + Errors.Type.ENTITY_NOT_FOUND + ' when no assessment exists for id', function (done) {
        action.id = 454147;

        execute()
            .then(failIfCalled)
            .catch(expectError(Errors.Type.ENTITY_NOT_FOUND))
            .finally(done);
    });

    describe('given assessment exists', function () {
        var assessment;
        beforeEach(function (done) {
            gateway.save(Stubs.unsavedAssessment())
                .then(function (savedAssessment) {
                    assessment = savedAssessment;
                    action.id = assessment.id;
                })
                .finally(done);
        });

        it('reacts with assessment', function (done) {
            execute()
                .then(function (reaction) {
                    expect(gateway.get).toHaveBeenCalledWith(assessment.id);
                    expect(reaction.assessment).toBe(assessment);
                })
                .catch(failIfCalled)
                .finally(done);
        });

    });

});