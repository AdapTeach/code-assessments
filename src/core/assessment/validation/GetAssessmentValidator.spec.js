var GetAssessmentValidator = require('./GetAssessmentValidator');
var Errors = require('../../error/Errors');
var Stubs = require('../../../util/Stubs.mock');

describe('GetAssessmentValidator', function () {

    var validator,
        gateway,
        interactor,
        action;

    beforeEach(function () {
        interactor = {
            execute: jasmine.createSpy('execute')
        };
        gateway = Stubs.assessmentGateway();
        validator = new GetAssessmentValidator(interactor, gateway);
        action = {};
    });

    function execute() {
        return validator.execute(action);
    }

    function expectError(expectedType) {
        return function (error) {
            expect(error.type).toBe(expectedType);
            expect(interactor.execute).not.toHaveBeenCalled();
        };
    }

    function failIfCalled() {
        expect('function').toBe('not called');
    }

    it('executes action when valid', function (done) {
        action = {id: 515618441};
        var stubAssessment = 'StubAssessment';
        gateway.get.and.returnValue(stubAssessment);
        var stubReaction = {assessment: stubAssessment};
        interactor.execute.and.returnValue(stubReaction);

        execute()
            .then(function (reaction) {
                expect(interactor.execute).toHaveBeenCalledWith(action);
                expect(reaction).toBe(stubReaction);
            })
            .catch(failIfCalled)
            .finally(done);
    });

    it('reacts with ' + Errors.Type.INVALID_ACTION + ' error when no id is defined', function (done) {
        execute()
            .then(failIfCalled)
            .catch(expectError(Errors.Type.INVALID_ACTION))
            .finally(done);
    });

});