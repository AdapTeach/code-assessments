var ErrorType = require('../error/ErrorType');

function CreateAssessmentValidator(decorated) {

    this.execute = function (action) {
        if (action.user) {
            return decorated.execute(action);
        }
        return {
            error: {
                type: ErrorType.LOGIN_REQUIRED
            }
        };
    };

}

module.exports = CreateAssessmentValidator;