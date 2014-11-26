var mongoose = require('mongoose-q')(require('mongoose')),
    Test = mongoose.model('Test'),
    HttpError = require('../../error/HttpError');

module.exports = function (app) {

    app.route('/test')
        .get(function(request,response){
            Test.find()
                .execQ()
                .then(function sendResponse(tests) {
                    res.json(tests);
                }).catch(HttpError.handle(response));
        });

    app.route('/assessment/:id/test')
        .post(function(request,response){
            Test.create(request.params.id, request.body)
                .then(function sendResponse(test){
                    response.json(test);
                })
                .catch(HttpError.handle(response));
        })
        .get(function(request,response){
            Test.find({assessment: request.params.id})
                .execQ()
                .then(function (tests) {
                    response.json(tests);
                })
                .catch(HttpError.handle(response));
        });

    app.route('/assessment/:id/test/:testId')
        .delete(function(request,response){
            Test.findOneAndRemove({_id: request.params.testId})
                .execQ()
                .then(function () {
                    response.json();
                })
                .catch(HttpError.handle(response));
        })
        .put(function(request,response){
            Test.findOneAndUpdate({_id: req.params.testId}, req.body)
                .execQ()
                .then(function (newTest) {
                    res.json(newTest);
                })
                .catch(HttpError.handle(response));
        });

};
