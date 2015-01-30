var useCase = require('./CreateUserAccountUseCase');
var ErrorType = require('../error/ErrorType');

describe('CreateUserAccountUseCase', function () {

    var interactor,
        gateway,
        request,
        response;

    beforeEach(function () {
        gateway = {
            get: function () {
            },
            create: function () {
            }
        };
        interactor = new useCase.interactor(gateway);
        request = new useCase.request();
    });

    function execute() {
        response = interactor.execute(request);
    }

    it('responds with error when empty username', function () {
        request.username = '';
        spyOn(gateway, 'create');

        execute();

        expect(gateway.create).not.toHaveBeenCalled();
        expect(response.error.type).toBe(ErrorType.INVALID_REQUEST);
    });

    it('responds with created user when username is not empty', function () {
        request.username = 'Username';
        var user = {id: 1, username: request.username};
        spyOn(gateway, 'create').and.returnValue(user);

        execute();

        expect(response.user).toBe(user);
        expect(gateway.create).toHaveBeenCalledWith(request.username);
    });

});