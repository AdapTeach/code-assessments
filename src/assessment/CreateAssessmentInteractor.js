var ErrorType = require('../error/ErrorType');

function CreateAssessmentInteractor(gateway) {

    this.execute = function (request) {
        if (!request.user) {
            return {error: {type: ErrorType.LOGIN_REQUIRED}};
        } else {
            var createdAssessment = gateway.create(request.assessment);
            return {assessment: createdAssessment};
        }
    };

}

module.exports = CreateAssessmentInteractor;