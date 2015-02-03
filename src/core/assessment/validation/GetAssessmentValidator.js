var Errors = require('../../error/Errors');

function GetAssessmentValidator(interactor, gateway) {

    this.execute = function (action) {
        if (!action.id)
            return Errors.invalidAction();
        return interactor.execute(action);
    };

}

module.exports = GetAssessmentValidator;