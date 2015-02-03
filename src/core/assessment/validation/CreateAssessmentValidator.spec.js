var CreateAssessmentValidator = require('./CreateAssessmentValidator');
var Errors = require('../../error/Errors');
var TestData = require('../../../util/TestData.mock');

describe('CreateAssessmentValidator', function () {

    var validator,
        interactor,
        action,
        reaction;


    beforeEach(function () {
        interactor = {
            execute: jasmine.createSpy('execute')
        };
        validator = new CreateAssessmentValidator(interactor);
        action = {};
    });

    function execute() {
        reaction = validator.execute(action);
    }

    it('executes action when valid', function () {
        action.loggedUser = TestData.loggedUser({username: 'assessment_creator'});
        var stubReaction = 'StubReaction';
        interactor.execute.and.returnValue(stubReaction);

        execute();

        expect(interactor.execute).toHaveBeenCalledWith(action);
        expect(reaction).toBe(stubReaction);
    });

    it('reacts with ' + Errors.Type.LOGIN_REQUIRED + ' when no user is logged', function () {
        execute();

        expect(reaction.error.type).toBe(Errors.Type.LOGIN_REQUIRED);
        expect(interactor.execute).not.toHaveBeenCalled();
    });

});
