var http = require('q-io/http');

var config = require('../../config/config'),
    Assessment = require('./assessment.model'),
    HttpError = require('../web/HttpError'),
    ensureAuthenticated = require('../auth/auth.middleware').ensureAuthenticated;

module.exports = function (app) {

    app.route('/assessment')
        .get(ensureAuthenticated, function (request, response) {
            Assessment.find({creator: request.user._id})
                .execQ()
                .then(function sendResponse(assessments) {
                    response.status(200).json(assessments);
                })
                .catch(HttpError.handle(response));
        })
        .post(ensureAuthenticated, function (request, response) {
            console.log(request.user, request.body);
            var assess = new Assessment(request.body);
            assess.creator = request.user._id;
            assess
                .saveQ()
                .then(function sendResponse(assess) {
                    response.status(200).json(assess);
                })
                .catch(HttpError.handle(response));
        })
        .put(ensureAuthenticated, function (request, response) {
            var id = request.body._id;
            delete request.body._id;
            Assessment
                .findOneAndUpdateQ({_id: id}, request.body)
                .then(function sendResponse(assessment) {
                    if (!assessment) {
                        HttpError.throw(400, "The assessment you're looking at doesn't exist.");
                    }
                    var data = {
                        _id: assessment._id,
                        title: assessment.title
                    };
                    response.json(data);
                })
                .fail(HttpError.handle(response));
        });

    app.route('/assessment/:id')
        .get(ensureAuthenticated, function (request, response) {
            Assessment
                .findOne({_id: request.params.id})
                .populate('providedCompilationUnits compilationUnitsToSubmit tests guides')
                .execQ()
                .then(function sendResponse(assessment) {
                    if (!assessment) {
                        HttpError.throw(400, "The assessment you're looking at doesn't exist.");
                    }
                    response.status(200).json(assessment);
                }).catch(HttpError.handle(response));
        })
        .put(ensureAuthenticated, function (request, response) {
            delete request.body._id;
            Assessment
                .findOneAndUpdateQ({_id: request.params.id}, request.body)
                .then(function sendResponse(assessment) {
                    if (!assessment) {
                        HttpError.throw(400, "The assessment you're looking at doesn't exist.");
                    }
                    response.json(assessment);
                })
                .fail(HttpError.handle(response));
        })
        .delete(ensureAuthenticated, function (request, response) {
            Assessment
                .remove({_id: request.params.id}).execQ()
                .then(function sendResponse(nb) {
                    if (nb === 0) {
                        HttpError.throw(400, "The assessment you're looking at doesn't exist.");
                    }
                    response.status(200).json({
                        message: 'assessment successfully removed'
                    });
                })
                .fail(HttpError.handle(response));
        });


    //change the index of a guide in an assessment's array of guide
    app.route(ensureAuthenticated, '/assessment/:id/guide/move/:from/to/:to')
        .put(function (request, response) {
            Assessment
                .findOne({_id: request.params.id})
                .execQ()
                .then(function (assessment) {
                    return assessment.moveGuide(request.params.from, request.params.to);
                })
                .then(function () {
                    response.status(200).json({
                        message: 'success'
                    });
                })
                .catch(HttpError.handle(response));
        });

    app.post('/assessment/:id/submission', function (request, response) {
        Assessment
            .findOne({_id: request.params.id})
            .populate('compilationUnitsToSubmit')
            .populate('providedCompilationUnits')
            .populate('tests')
            .execQ()
            .then(function (assessment) {
                var submittedCompilationUnits = request.body.submittedCompilationUnits;
                var options = {
                    url: config.codeAssesserJavaUrl,
                    method: 'POST',
                    body: [
                        JSON.stringify({
                            assessment: assessment,
                            submittedCompilationUnits: submittedCompilationUnits
                        })
                    ]
                };
                return http.request(http.normalizeRequest(options))
                    .then(function (submissionResponse) {
                        return submissionResponse.body.read().then(function (body) {
                            response
                                .status(submissionResponse.status)
                                .json(JSON.parse(body));
                        });
                    });
            })
            .catch(HttpError.handle(response));
    });
};