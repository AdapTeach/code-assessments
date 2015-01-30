function GetAssessmentRequest(assessmentId) {
    this.assessmentId = assessmentId;
}

function GetAssessmentResponse(assessment) {
    this.assessment = assessment;
}

function GetAssessmentInteractor(gateway) {

    this.gateway = gateway;

    this.execute = function (request) {
        var assessmentId = request.assessmentId;
        var assessment = this.gateway.get(assessmentId);
        var response = new GetAssessmentResponse(assessment);
        return response;
    };

}

var GetAssessmentUseCase = {

    request: GetAssessmentRequest,

    response: GetAssessmentResponse,

    interactor: GetAssessmentInteractor

};

module.exports = GetAssessmentUseCase;