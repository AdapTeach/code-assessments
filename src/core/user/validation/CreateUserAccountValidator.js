var Errors = require('../../error/Errors');

function CreateUserAccountValidator(interactor, gateway) {

    this.execute = function (action) {
        if (!action.username) {
            return Errors.invalidAction('username required');
        }
        return interactor.execute(action);
    };

}

module.exports = CreateUserAccountValidator;