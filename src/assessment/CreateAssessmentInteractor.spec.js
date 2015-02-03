var _ = require('lodash');
var CreateAssessmentInteractor = require('./CreateAssessmentInteractor');
var ErrorType = require('../error/ErrorType');
var TestData = require('../entity/TestData.mock.js');

describe('CreateAssessmentInteractor', function () {

    var interactor,
        gateway,
        action,
        reaction;

    beforeEach(function () {
        gateway = {
            create: function () {
            }
        };
        interactor = new CreateAssessmentInteractor(gateway);
        action = {};
    });

    function execute() {
        reaction = interactor.execute(action);
    }

    describe('given user is logged in', function () {
        beforeEach(function () {
            action.user = TestData.user({username: 'assessment_creator'});
        });

        describe('given assessment is valid', function () {
            beforeEach(function () {
                action.assessment = TestData.unsavedAssessment();
            });
            it('responds with created assessment', function () {
                var createdAssessment = _.cloneDeep(action.assessment);
                createdAssessment.id = 5157411397;
                spyOn(gateway, ['create']).and.returnValue(createdAssessment);

                execute();

                expect(reaction.assessment).toBe(createdAssessment);
            });
        });

    });

});