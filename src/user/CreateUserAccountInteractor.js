var Errors = require('../error/Errors');

function CreateUserAccountInteractor(gateway) {

    this.execute = function (action) {
        if (action.username.length === 0) {
            return {error: {type: Errors.Type.INVALID_ACTION}};
        }
        var user = gateway.create(action.username);
        var reaction = {loggedUser: user};
        return reaction;
    };

}

module.exports = CreateUserAccountInteractor;