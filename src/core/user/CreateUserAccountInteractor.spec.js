var CreateUserAccountInteractor = require('./CreateUserAccountInteractor');
var Stubs = require('../util/Stubs.mock.js');

describe('CreateUserAccountInteractor', function () {

    var interactor,
        gateway,
        action;

    beforeEach(function () {
        gateway = Stubs.userGateway();
        interactor = new CreateUserAccountInteractor(gateway);
        action = {};
    });

    function execute() {
        return interactor.execute(action);
    }

    it('responds with created user', function (done) {
        action.user = Stubs.unregisteredUser();

        execute()
            .then(function (reaction) {
                expect(reaction.user.id).toEqual(jasmine.any(Number));
                expect(gateway.save).toHaveBeenCalledWith(action.user);
            })
            .then(done);
    });

});