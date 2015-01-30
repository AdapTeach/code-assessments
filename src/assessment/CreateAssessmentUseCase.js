var ErrorType = require('../error/ErrorType');

function CreateAssessmentRequest() {
}

function CreateAssessmentResponse() {
}

function CreateAssessmentInteractor(gateway) {

    this.execute = function (request) {
        var response = new CreateAssessmentResponse();
        return response;
    };

}

var CreateAssessmentUseCase = {

    request: CreateAssessmentRequest,

    response: CreateAssessmentResponse,

    interactor: CreateAssessmentInteractor

};

module.exports = CreateAssessmentUseCase;