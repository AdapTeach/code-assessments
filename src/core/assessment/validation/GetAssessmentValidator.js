var Errors = require('../../error/Errors');

function GetAssessmentValidator(interactor, gateway) {

    this.execute = function (action) {
        if (!action.id)
            return Errors.invalidAction();
        else if (!gateway.get(action.id))
            return Errors.entityNotFound();
        return interactor.execute(action);
    };

}

module.exports = GetAssessmentValidator;