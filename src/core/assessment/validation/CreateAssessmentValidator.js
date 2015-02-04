var Future = require('bluebird');

var Errors = require('../../error/Errors');

function CreateAssessmentValidator(interactor) {

    this.execute = function (action) {
        return new Future(function (resolve, reject) {
            if (!action.user)
                reject(Errors.loginRequired());
            else
                resolve(interactor.execute(action));
        });
    };

}

module.exports = CreateAssessmentValidator;