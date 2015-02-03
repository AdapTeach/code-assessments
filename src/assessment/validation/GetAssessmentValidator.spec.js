var GetAssessmentValidator = require('./GetAssessmentValidator');
var Errors = require('../../error/Errors');

describe('GetAssessmentValidator', function () {

    var validator,
        gateway,
        interactor,
        action,
        reaction;

    beforeEach(function () {
        interactor = {
            execute: jasmine.createSpy('execute')
        };
        gateway = {
            get: jasmine.createSpy('get')
        };
        validator = new GetAssessmentValidator(interactor, gateway);
        action = {};
    });

    function execute() {
        reaction = validator.execute(action);
    }

    function expectError(expectedType) {
        expect(reaction.error.type).toBe(expectedType);
        expect(interactor.execute).not.toHaveBeenCalled();
    }

    it('executes action when valid', function () {
        action = {id: 515618441};
        var stubAssessment = 'StubAssessment';
        gateway.get.and.returnValue(stubAssessment);
        var stubReaction = {assessment: stubAssessment};
        interactor.execute.and.returnValue(stubReaction);

        execute();

        expect(interactor.execute).toHaveBeenCalledWith(action);
        expect(reaction).toBe(stubReaction);
    });

    it('reacts with ' + Errors.Type.INVALID_ACTION + ' error when no id is defined', function () {
        execute();

        expectError(Errors.Type.INVALID_ACTION);
    });

    it('reacts with ' + Errors.Type.ENTITY_NOT_FOUND + ' when no assessment exists for id', function () {
        action.id = 12345679;

        execute();

        expectError(Errors.Type.ENTITY_NOT_FOUND);
    });
});