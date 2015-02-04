function GetAssessmentInteractor(gateway) {

    this.execute = function (action) {
        return gateway.get(action.id)
            .then(function react(assessment) {
                return {assessment: assessment};
            });
    };

}

module.exports = GetAssessmentInteractor;