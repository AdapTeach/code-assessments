var _ = require('lodash');
var CreateAssessmentInteractor = require('./CreateAssessmentInteractor');
var Stubs = require('../../util/Stubs.js');

describe('CreateAssessmentInteractor', function () {

    var interactor,
        gateway,
        action,
        reaction;

    beforeEach(function () {
        gateway = {
            create: jasmine.createSpy('create')
        };
        interactor = new CreateAssessmentInteractor(gateway);
        action = {};
    });

    function execute() {
        reaction = interactor.execute(action);
    }

    beforeEach(function () {
        action.loggedUser = Stubs.loggedUser({username: 'assessment_creator'});
        action.assessment = Stubs.unsavedAssessment();
    });

    it('reacts with created assessment', function () {
        var createdAssessment = _.cloneDeep(action.assessment);
        createdAssessment.id = 5157411397;
        gateway.create.and.returnValue(createdAssessment);

        execute();

        expect(reaction.assessment).toBe(createdAssessment);
    });

});