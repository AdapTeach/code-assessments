var Future = require('bluebird');

var Errors = require('../../error/Errors');

function CreateUserAccountValidator(interactor) {

    this.execute = function (action) {
        return new Future(function (resolve, reject) {
            if (!action.user.username)
                reject(Errors.invalidAction('username required'));
            else
                resolve(interactor.execute(action));
        });
    };

}

module.exports = CreateUserAccountValidator;