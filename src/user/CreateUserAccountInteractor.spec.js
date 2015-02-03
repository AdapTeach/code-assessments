var CreateUserAccountInteractor = require('./CreateUserAccountInteractor');
var ErrorType = require('../error/ErrorType');

describe('CreateUserAccountInteractor', function () {

    var interactor,
        gateway,
        action,
        reaction;

    beforeEach(function () {
        gateway = {
            get: function () {
            },
            create: function () {
            }
        };
        interactor = new CreateUserAccountInteractor(gateway);
        action = {};
    });

    function execute() {
        reaction = interactor.execute(action);
    }

    it('responds with error when empty username', function () {
        action.username = '';
        spyOn(gateway, 'create');

        execute();

        expect(gateway.create).not.toHaveBeenCalled();
        expect(reaction.error.type).toBe(ErrorType.INVALID_REQUEST);
    });

    it('responds with created user when username is not empty', function () {
        action.username = 'Username';
        var user = {id: 1, username: action.username};
        spyOn(gateway, 'create').and.returnValue(user);

        execute();

        expect(reaction.user).toBe(user);
        expect(gateway.create).toHaveBeenCalledWith(action.username);
    });

});