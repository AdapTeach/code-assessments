var CreateUserAccountInteractor = require('./CreateUserAccountInteractor');
var Errors = require('../error/Errors');

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
        expect(reaction.error.type).toBe(Errors.Type.INVALID_ACTION);
    });

    it('responds with created user when username is not empty', function () {
        action.username = 'Username';
        var user = {id: 1, username: action.username};
        spyOn(gateway, 'create').and.returnValue(user);

        execute();

        expect(reaction.loggedUser).toBe(user);
        expect(gateway.create).toHaveBeenCalledWith(action.username);
    });

});