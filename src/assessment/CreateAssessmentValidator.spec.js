var CreateAssessmentValidator = require('./CreateAssessmentValidator');
var ErrorType = require('../error/ErrorType');

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

    it('executes decorated interactor when action is valid', function () {
        action = {
            user: {}
        };
        var expectedReaction = 'ExpectedReaction';
        interactor.execute.and.returnValue(expectedReaction);

        execute();

        expect(interactor.execute).toHaveBeenCalled();
    });

    describe('given no logged user', function () {
        it('reacts with error', function () {
            execute();
            expect(reaction.error.type).toBe(ErrorType.LOGIN_REQUIRED);
            expect(interactor.execute).not.toHaveBeenCalled();
        });
    });

});
