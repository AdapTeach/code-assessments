var Errors = require('../../error/Errors');

function CreateAssessmentValidator(decorated) {

    this.execute = function (action) {
        if (!action.loggedUser)
            return Errors.loginRequired();
        return decorated.execute(action);
    };

}

module.exports = CreateAssessmentValidator;