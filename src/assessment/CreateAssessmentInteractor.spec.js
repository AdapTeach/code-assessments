var _ = require('lodash');
var CreateAssessmentInteractor = require('./CreateAssessmentInteractor');
var ErrorType = require('../error/ErrorType');
var TestData = require('../entity/TestData.mock.js');

describe('CreateAssessmentInteractor', function () {

    var interactor,
        gateway,
        request,
        response;

    beforeEach(function () {
        gateway = {
            create: function () {
            }
        };
        interactor = new CreateAssessmentInteractor(gateway);
        request = {};
    });

    function execute() {
        response = interactor.execute(request);
    }

    describe('given no logged user', function () {
        it('responds with error', function () {
            execute();
            expect(response.error.type).toBe(ErrorType.LOGIN_REQUIRED);
        });
    });

    describe('given user is logged in', function () {
        beforeEach(function () {
            request.user = TestData.user({username: 'assessment_creator'});
        });

        describe('given assessment is valid', function () {
            beforeEach(function () {
                request.assessment = TestData.unsavedAssessment();
            });
            it('responds with created assessment', function () {
                var createdAssessment = _.cloneDeep(request.assessment);
                createdAssessment.id = 5157411397;
                spyOn(gateway, ['create']).and.returnValue(createdAssessment);

                execute();

                expect(response.assessment).toBe(createdAssessment);
            });
        });

    });

});