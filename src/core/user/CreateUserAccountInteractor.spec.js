var CreateUserAccountInteractor = require('./CreateUserAccountInteractor');
var Stubs = require('../../util/Stubs.js');

describe('CreateUserAccountInteractor', function () {

    var interactor,
        gateway,
        action,
        reaction;

    beforeEach(function () {
        gateway = jasmine.createSpyObj('gateway', ['create', 'get']);
        interactor = new CreateUserAccountInteractor(gateway);
        action = {};
    });

    function execute() {
        reaction = interactor.execute(action);
    }

    it('responds with created user', function () {
        var stubUser = Stubs.unregisteredUser();
        gateway.create.and.returnValue(stubUser);

        execute();

        expect(reaction.loggedUser).toBe(stubUser);
        expect(gateway.create).toHaveBeenCalledWith(action.username);
    });

});