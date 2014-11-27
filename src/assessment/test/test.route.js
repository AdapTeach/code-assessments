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
        .get(function(request,response){
            Test.findOne({_id : request.params.testId})
                .execQ()
                .then(function (test) {
                    if(!test){
                        HttpError.throw(400,"The test you're looking at doesn't exist.");
                    }
                    response.json(test);
                })
                .catch(HttpError.handle(response));
        })
        .delete(function(request,response){
            Test.findOneAndRemove({_id: request.params.testId})
                .execQ()
                .then(function (nb) {
                    if(nb===0){
                        HttpError.throw(400,"The test you're looking at doesn't exist.");
                    }
                    response.json();
                })
                .catch(HttpError.handle(response));
        })
        .put(function(request,response){
            Test.findOneAndUpdate({_id: request.params.testId}, request.body)
                .execQ()
                .then(function (updatedTest) {
                    if(!updatedTest){
                        HttpError.throw(400,"The test you're looking at doesn't exist.");
                    }
                    response.json(updatedTest);
                })
                .catch(HttpError.handle(response));
        });

};
