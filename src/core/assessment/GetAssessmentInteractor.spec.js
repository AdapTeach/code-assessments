var GetAssessmentInteractor = require('./GetAssessmentInteractor');
var TestData = require('../../util/TestData.mock.js');
var Errors = require('../error/Errors');

describe('GetAssessmentInteractor', function () {

    var interactor,
        gateway,
        action,
        reaction;

    beforeEach(function () {
        gateway = {
            get: jasmine.createSpy('get')
        };
        interactor = new GetAssessmentInteractor(gateway);
        action = {};
    });

    function execute() {
        reaction = interactor.execute(action);
    }

    it('reacts with ' + Errors.Type.ENTITY_NOT_FOUND + ' when no assessment exists for id', function () {
        action.id = 12345679;

        execute();

        expect(reaction.error.type).toBe(Errors.Type.ENTITY_NOT_FOUND);
    });

    describe('given assessment exists', function () {
        var assessment = TestData.assessment;
        beforeEach(function () {
            gateway.get.and.returnValue(assessment);
            action.assessmentId = assessment.id;
        });

        it('reacts with assessment', function () {
            execute();

            expect(gateway.get).toHaveBeenCalledWith(assessment.id);
            expect(reaction.assessment).toBe(assessment);
        });

    });

});