var mongoose = require('mongoose-q')(require('mongoose')),
    Guide = mongoose.model('Guide'),
    HttpError = require('../../error/HttpError');

module.exports = function (app) {

    app.route('/guide')
        .get(function(request,response){
            Guide.find()
                .execQ()
                .then(function (guides) {
                    response.json(guides);
                })
                .catch(HttpError.handle(response));
        });

    app.route('/assessment/:id/guide')
        .post(function(request,response){
            Guide.create(request.params.id, request.body)
                .then(function (guides) {
                    response.json(guides);
                })
                .catch(HttpError.handle(response));
        })
        .get(function(request,response){
            Guide.find({assessment: request.params.id})
                .execQ()
                .then(function (guides) {
                    response.json(guides);
                })
                .catch(HttpError.handle(response));
        });

    app.route('/assessment/:id/guide/:guideId')
        .get(function(request,response){
            Guide.findOne({_id: request.params.guideId})
                .execQ()
                .then(function (guide) {
                    if(!guide){
                        HttpError.throw(400,"The guide you're looking at doesn't exist.");
                    }
                    response.json(guide);
                })
                .catch(HttpError.handle(response));
        })
        .put(function(request,response){
            Guide.findOneAndUpdate({_id: request.params.guideId}, request.body)
                .execQ()
                .then(function (guide) {
                    if(!guide){
                        HttpError.throw(400,"The guide you're looking at doesn't exist.");
                    }
                    response.status(200).send(guide);
                })
                .catch(HttpError.handle(response));
        })
        .delete(function(request,response){
            Guide.findOneAndRemove({_id: request.params.guideId})
                .execQ()
                .then(function (nb) {
                    if(nb===0){
                        HttpError.throw(400,"The guide you're looking at doesn't exist.");
                    }
                    response.status(200).json();
                })
                .catch(HttpError.handle(response));
        });
};
