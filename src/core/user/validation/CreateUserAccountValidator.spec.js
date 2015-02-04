var CreateUserAccountValidator = require('./CreateUserAccountValidator');
var Errors = require('../../error/Errors');

describe('CreateUserAccountValidator', function () {

    var validator,
        gateway,
        interactor,
        action,
        reaction;

    beforeEach(function () {
        interactor = {
            execute: jasmine.createSpy('execute')
        };
        gateway = jasmine.createSpyObj('gateway', ['create', 'get', 'update', 'delete']);
        validator = new CreateUserAccountValidator(interactor, gateway);
        action = {};
    });

    function execute() {
        reaction = validator.execute(action);
    }

    function expectError(expectedType) {
        expect(reaction.error.type).toBe(expectedType);
        expect(interactor.execute).not.toHaveBeenCalled();
    }

    it('responds with ' + Errors.Type.INVALID_ACTION + ' error when username is empty', function () {
        action.username = '';

        execute();

        expectError(Errors.Type.INVALID_ACTION);
    });

});