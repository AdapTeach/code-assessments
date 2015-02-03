var ErrorType = require('../error/ErrorType');

function CreateAssessmentInteractor(gateway) {

    this.execute = function (action) {
        if (!action.user) {
            return {error: {type: ErrorType.LOGIN_REQUIRED}};
        } else {
            var createdAssessment = gateway.create(action.assessment);
            return {assessment: createdAssessment};
        }
    };

}

module.exports = CreateAssessmentInteractor;