var useCase = require('./GetAssessmentUseCase');
var ErrorType = require('../error/ErrorType');

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

    it('responds with error when no assessment exists for id', function () {
        request.id = 12345679;
        var response = interactor.execute(request);
        expect(response.assessment).toBeUndefined();
        expect(response.error.type).toBe(ErrorType.ENTITY_NOT_FOUND);
    });

    describe('given assessment exists', function () {
        var assessment = {
            id: 1234567
        };
        beforeEach(function () {
            spyOn(gateway, 'get').and.returnValue(assessment);
        });

        it('responds with assessment', function () {
            request.assessmentId = assessment.id;
            var response = interactor.execute(request);
            expect(gateway.get).toHaveBeenCalledWith(assessment.id);
            expect(response.assessment).toBe(assessment);
        });

    });

});