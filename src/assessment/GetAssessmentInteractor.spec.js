var GetAssessmentInteractor = require('./GetAssessmentInteractor');
var ErrorType = require('../error/ErrorType');
var TestData = require('../entity/TestData.mock.js');

describe('GetAssessmentInteractor', function () {

    var interactor,
        gateway,
        action,
        reaction;

    beforeEach(function () {
        gateway = {
            get: function () {
            }
        };
        interactor = new GetAssessmentInteractor(gateway);
        action = {};
    });

    function execute() {
        reaction = interactor.execute(action);
    }

    it('responds with error when no assessment exists for id', function () {
        action.id = 12345679;

        execute();

        expect(reaction.assessment).toBeUndefined();
        expect(reaction.error.type).toBe(ErrorType.ENTITY_NOT_FOUND);
    });

    describe('given assessment exists', function () {
        var assessment = TestData.assessment;
        beforeEach(function () {
            spyOn(gateway, 'get').and.returnValue(assessment);
            action.assessmentId = assessment.id;
        });

        it('responds with assessment', function () {
            execute();

            expect(gateway.get).toHaveBeenCalledWith(assessment.id);
            expect(reaction.assessment).toBe(assessment);
        });

    });

});