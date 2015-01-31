var ErrorType = require('../error/ErrorType');

function CreateUserAccountInteractor(gateway) {

    this.execute = function (request) {
        if (request.username.length === 0) {
            return {error: {type: ErrorType.INVALID_REQUEST}};
        }
        var user = gateway.create(request.username);
        var response = {user: user};
        return response;
    };

}

module.exports = CreateUserAccountInteractor;