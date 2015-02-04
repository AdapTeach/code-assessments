var CreateAssessmentValidator = require('./CreateAssessmentValidator');
var Errors = require('../../error/Errors');
var Stubs = require('../../util/Stubs.mock');

describe('CreateAssessmentValidator', function () {

    var validator,
        interactor,
        action;


    beforeEach(function () {
        interactor = {
            execute: jasmine.createSpy('execute')
        };
        validator = new CreateAssessmentValidator(interactor);
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
        action.user = Stubs.registeredUser({username: 'assessment_creator'});
        var stubReaction = 'StubReaction';
        interactor.execute.and.returnValue(stubReaction);

        execute()
            .then(function (reaction) {
                expect(interactor.execute).toHaveBeenCalledWith(action);
                expect(reaction).toBe(stubReaction);
            })
            .catch(failIfCalled)
            .finally(done);
    });

    it('reacts with ' + Errors.Type.LOGIN_REQUIRED + ' error when no user is logged in', function (done) {
        execute()
            .then(failIfCalled)
            .catch(expectError(Errors.Type.LOGIN_REQUIRED))
            .finally(done);
    });

});
