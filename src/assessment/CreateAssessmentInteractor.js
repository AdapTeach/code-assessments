function CreateAssessmentInteractor(gateway) {

    this.execute = function (action) {
        var createdAssessment = gateway.create(action.assessment);
        return {assessment: createdAssessment};
    };

}

module.exports = CreateAssessmentInteractor;