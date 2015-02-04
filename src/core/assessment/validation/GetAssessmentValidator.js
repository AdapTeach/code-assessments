var Future = require('bluebird');
var Errors = require('../../error/Errors');

function GetAssessmentValidator(interactor) {

    this.execute = function (action) {
        return new Future(function (resolve, reject) {
            if (!action.id)
                reject(Errors.invalidAction('ID is required'));
            else
                resolve(interactor.execute(action));
        });
    };

}

module.exports = GetAssessmentValidator;