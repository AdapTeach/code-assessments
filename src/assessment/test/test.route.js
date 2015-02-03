var mongoose = require('mongoose-q')(require('mongoose')),
    Test = mongoose.model('Test'),
    HttpError = require('.././HttpError'),
    ensureAuthenticated = require('../../auth/auth.middleware').ensureAuthenticated;

module.exports = function (app) {

    app.route('/test')
        .get(ensureAuthenticated,function(request,response){
            Test
                .find()
                .execQ()
                .then(function sendResponse(tests) {
                    res.json(tests);
                }).catch(HttpError.handle(response));
        });

    app.route('/assessment/:id/test')
        .post(ensureAuthenticated,function(request,response){
            request.body.assessment = request.params.id;
            request.body.creator = request.user._id;
            Test
                .create(request.params.id, request.body)
                .then(function sendResponse(test){
                    response.json(test);
                })
                .catch(HttpError.handle(response));
        })
        .get(ensureAuthenticated,function(request,response){
            Test
                .find({assessment: request.params.id})
                .execQ()
                .then(function (tests) {
                    response.json(tests);
                })
                .catch(HttpError.handle(response));
        })
        .put(ensureAuthenticated,function(request,response){
            var id = request.body._id;
            delete request.body._id;
            Test
                .findOneAndUpdate({_id: id}, request.body)
                .execQ()
                .then(function (updatedTest) {
                    if(!updatedTest){
                        HttpError.throw(400,"The test you're looking at doesn't exist.");
                    }
                    response.status(200).json(updatedTest);
                })
                .catch(HttpError.handle(response));
        });

    app.route(ensureAuthenticated,'/assessment/:id/test/:testId')
        .get(function(request,response){
            Test
                .findOne({_id : request.params.testId})
                .execQ()
                .then(function (test) {
                    if(!test){
                        HttpError.throw(400,"The test you're looking at doesn't exist.");
                    }
                    response.json(test);
                })
                .catch(HttpError.handle(response));
        })
        .delete(ensureAuthenticated,function(request,response){
            Test
                .findOneAndRemove({_id: request.params.testId})
                .execQ()
                .then(function (nb) {
                    if(nb===0){
                        HttpError.throw(400,"The test you're looking at doesn't exist.");
                    }
                    response.status(200).json({
                        message : 'test successfully removed'
                    });
                })
                .catch(HttpError.handle(response));
        })
        .put(ensureAuthenticated,function(request,response){
            delete request.body._id;
            Test
                .findOneAndUpdate({_id: request.params.testId}, request.body)
                .execQ()
                .then(function (updatedTest) {
                    if(!updatedTest){
                        HttpError.throw(400,"The test you're looking at doesn't exist.");
                    }
                    response.status(200).json(updatedTest);
                })
                .catch(HttpError.handle(response));
        });

};
