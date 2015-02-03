var Errors = require('../error/Errors');

function GetAssessmentInteractor(gateway) {

    this.execute = function (action) {
        var assessmentId = action.assessmentId;
        var assessment = gateway.get(assessmentId);
        if (!assessment) {
            return Errors.entityNotFound('No assessment found for ID : ' + assessmentId);
        }
        return {assessment: assessment};
    };

}

module.exports = GetAssessmentInteractor;