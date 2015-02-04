var CreateAssessmentInteractor = require('./CreateAssessmentInteractor');
var Stubs = require('../../util/Stubs.mock.js');

describe('CreateAssessmentInteractor', function () {

    var interactor,
        gateway,
        action;

    beforeEach(function () {
        gateway = Stubs.assessmentGateway();
        interactor = new CreateAssessmentInteractor(gateway);
        action = {};
    });

    function execute() {
        return interactor.execute(action);
    }

    function failIfCalled() {
        expect('function').toBe('not called');
    }

    beforeEach(function () {
        action.loggedUser = Stubs.registeredUser({username: 'assessment_creator'});
        action.assessment = Stubs.unsavedAssessment();
    });

    it('reacts with created assessment', function (done) {
        execute()
            .then(function (reaction) {
                var createdAssessment = reaction.assessment;
                expect(createdAssessment.id).toBeTruthy();
                delete createdAssessment.id;
                expect(createdAssessment).toBe(action.assessment);
            })
            .catch(failIfCalled)
            .finally(done);
    });

});