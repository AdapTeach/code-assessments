var ErrorType = require('../error/ErrorType');

function GetAssessmentRequest(assessmentId) {
    this.assessmentId = assessmentId;
}

function GetAssessmentResponse(assessment) {
    this.assessment = assessment;
    this.error = null;
}

function GetAssessmentInteractor(gateway) {

    this.execute = function (request) {
        var assessmentId = request.assessmentId;
        var assessment = gateway.get(assessmentId);
        var response = new GetAssessmentResponse(assessment);
        if (!assessment) {
            response.error = {
                type: ErrorType.ENTITY_NOT_FOUND,
                message: 'No assessment found for ID : ' + assessmentId
            };
        }
        return response;
    };

}

var GetAssessmentUseCase = {

    request: GetAssessmentRequest,

    response: GetAssessmentResponse,

    interactor: GetAssessmentInteractor

};

module.exports = GetAssessmentUseCase;