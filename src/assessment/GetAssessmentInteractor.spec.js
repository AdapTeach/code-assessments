var GetAssessmentInteractor = require('./GetAssessmentInteractor');
var ErrorType = require('../error/ErrorType');
var TestData = require('../entity/TestData.mock.js');

describe('GetAssessmentInteractor', function () {

    var interactor,
        gateway,
        request,
        response;

    beforeEach(function () {
        gateway = {
            get: function () {
            }
        };
        interactor = new GetAssessmentInteractor(gateway);
        request = {};
    });

    function execute() {
        response = interactor.execute(request);
    }

    it('responds with error when no assessment exists for id', function () {
        request.id = 12345679;
        var response = interactor.execute(request);
        expect(response.assessment).toBeUndefined();
        expect(response.error.type).toBe(ErrorType.ENTITY_NOT_FOUND);
    });

    describe('given assessment exists', function () {
        var assessment = TestData.assessment;
        beforeEach(function () {
            spyOn(gateway, 'get').and.returnValue(assessment);
            request.assessmentId = assessment.id;
        });

        it('responds with assessment', function () {
            execute();

            expect(gateway.get).toHaveBeenCalledWith(assessment.id);
            expect(response.assessment).toBe(assessment);
        });

    });

});