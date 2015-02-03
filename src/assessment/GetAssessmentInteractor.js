var ErrorType = require('../error/ErrorType');

function GetAssessmentInteractor(gateway) {

    this.execute = function (action) {
        var assessmentId = action.assessmentId;
        var assessment = gateway.get(assessmentId);
        if (!assessment) {
            return {
                error: {
                    type: ErrorType.ENTITY_NOT_FOUND,
                    message: 'No assessment found for ID : ' + assessmentId
                }
            };
        } else {
            return {assessment: assessment};
        }
    };

}

module.exports = GetAssessmentInteractor;