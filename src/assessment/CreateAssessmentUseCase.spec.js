var useCase = require('./CreateAssessmentUseCase');
var ErrorType = require('../error/ErrorType');

describe('CreateAssessmentUseCase', function () {

    var interactor,
        gateway,
        request;

    beforeEach(function () {
        gateway = {
            create: function () {
            }
        };
        interactor = new useCase.interactor(gateway);
        request = new useCase.request();
    });

    describe('given user not logged ', function () {

    });

});