var CreateUserAccountValidator = require('./CreateUserAccountValidator');
var Errors = require('../../error/Errors');
var Stubs = require('../../util/Stubs.mock');

describe('CreateUserAccountValidator', function () {

    var validator,
        gateway,
        interactor,
        action;

    beforeEach(function () {
        interactor = {
            execute: jasmine.createSpy('execute')
        };
        gateway = Stubs.userGateway();
        validator = new CreateUserAccountValidator(interactor, gateway);
        action = {};
    });

    function execute() {
        return validator.execute(action);
    }

    function failIfCalled() {
        expect('function').toBe('not called');
    }

    function expectError(expectedType) {
        return function (error) {
            expect(error.type).toBe(expectedType);
            expect(interactor.execute).not.toHaveBeenCalled();
        };
    }

    it('executes action when valid', function (done) {
        action.user = Stubs.unregisteredUser();
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

    it('responds with ' + Errors.Type.INVALID_ACTION + ' error when username is empty', function (done) {
        action.user = {};

        execute()
            .then(failIfCalled)
            .catch(expectError(Errors.Type.INVALID_ACTION))
            .finally(done);
    });

});