var Errors = require('../../error/Errors');

function CreateUserAccountValidator(interactor, gateway) {

    this.execute = function (action) {
        return interactor.execute(action);
    };

}

module.exports = CreateUserAccountValidator;