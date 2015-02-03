var ErrorType = require('../error/ErrorType');

function CreateUserAccountInteractor(gateway) {

    this.execute = function (action) {
        if (action.username.length === 0) {
            return {error: {type: ErrorType.INVALID_REQUEST}};
        }
        var user = gateway.create(action.username);
        var reaction = {user: user};
        return reaction;
    };

}

module.exports = CreateUserAccountInteractor;