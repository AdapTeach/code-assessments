var useCase = require('./GetAssessmentUseCase');

describe('GetAssessmentUseCase', function () {

    var interactor,
        gateway,
        request;

    beforeEach(function () {
        gateway = {
            get: function () {
            }
        };
        interactor = new useCase.interactor(gateway);
        request = new useCase.request();
    });

    describe('given assessment does not exist', function () {
        var missingId = 1234567;
        beforeEach(function () {
            request.id = missingId;
        });

        it('responds with no assessment', function () {
            var response = interactor.execute(request);
            expect(response.assessment).toBeUndefined();
        });


    });

    describe('given assessment exists', function () {
        var assessment = {
            id: 1234567
        };
        beforeEach(function () {
            gateway.get = function () {
                return assessment;
            };
        });

        it('responds with assessment', function () {
            request.assessmentId = assessment.id;
            var response = interactor.execute(request);
            expect(response.assessment).toBe(assessment);
        });

    });

})
;