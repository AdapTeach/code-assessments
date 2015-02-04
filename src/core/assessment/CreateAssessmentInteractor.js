function CreateAssessmentInteractor(gateway) {

    this.execute = function (action) {
        return gateway.save(action.assessment)
            .then(function (createdAssessment) {
                return {assessment: createdAssessment};
            });
    };

}

module.exports = CreateAssessmentInteractor;