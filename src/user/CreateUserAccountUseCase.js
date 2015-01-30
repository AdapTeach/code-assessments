var ErrorType = require('../error/ErrorType');

function CreateUserAccountRequest() {
}

function CreateUserAccountResponse(user) {
    this.user = user;
    this.error = null;
}

function CreateUserAccountInteractor(gateway) {

    this.execute = function (request) {
        if (request.username.length === 0) {
            return {error: {type: ErrorType.INVALID_REQUEST}};
        }
        var user = gateway.create(request.username);
        var response = new CreateUserAccountResponse(user);
        return response;
    };

}

var CreateUserAccountUseCase = {

    request: CreateUserAccountRequest,

    response: CreateUserAccountResponse,

    interactor: CreateUserAccountInteractor

};

module.exports = CreateUserAccountUseCase;