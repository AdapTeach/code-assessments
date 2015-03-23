var mongoose = require('mongoose-q')(require('mongoose')),
    Guide = mongoose.model('Guide'),
    HttpError = require('../../web/HttpError'),
    ensureAuthenticated = require('../../auth/auth.middleware').ensureAuthenticated;

module.exports = function (app) {

    app.route('/guide')
        .get(ensureAuthenticated,function(request,response){
            Guide
                .find()
                .execQ()
                .then(function (guides) {
                    response.status(200).json(guides);
                })
                .catch(HttpError.handle(response));
        });

    app.route('/assessment/:id/guide')
        .post(ensureAuthenticated,function(request,response){
            request.body.creator = request.user._id;
            request.body.assessment = request.params.id;
            Guide
                .save(request.params.id, request.body)
                .then(function (guide) {
                    var data = {
                        _id : guide._id,
                        title : guide.title
                    };
                    response.status(200).json(data);
                })
                .catch(HttpError.handle(response));
        })
        .put(ensureAuthenticated,function(request,response){
            delete request.body._id;
            Guide
                .findOneAndUpdate({_id: id}, request.body)
                .execQ()
                .then(function (guide) {
                    if(!guide){
                        HttpError.throw(400,"The guide you're looking at doesn't exist.");
                    }
                    response.status(200).json(guide);
                })
                .catch(HttpError.handle(response));
        })
        .get(ensureAuthenticated,function(request,response){
            Guide
                .find({assessment: request.params.id})
                .execQ()
                .then(function (guides) {
                    response.status(200).json(guides);
                })
                .catch(HttpError.handle(response));
        });

    app.route('/assessment/:id/guide/:guideId')
        .get(ensureAuthenticated,function(request,response){
            Guide
                .findOne({_id: request.params.guideId})
                .execQ()
                .then(function (guide) {
                    if(!guide){
                        HttpError.throw(400,"The guide you're looking at doesn't exist.");
                    }
                    response.status(200).json(guide);
                })
                .catch(HttpError.handle(response));
        })
        .put(ensureAuthenticated,function(request,response){
            delete request.body._id;
            Guide
                .findOneAndUpdate({_id: request.params.guideId}, request.body)
                .execQ()
                .then(function (guide) {
                    if(!guide){
                        HttpError.throw(400,"The guide you're looking at doesn't exist.");
                    }
                    response.status(200).json(guide);
                })
                .catch(HttpError.handle(response));
        })
        .delete(ensureAuthenticated,function(request,response){
            Guide
                .findOneAndRemove({_id: request.params.guideId})
                .execQ()
                .then(function (nb) {
                    if(nb===0){
                        HttpError.throw(400,"The guide you're looking at doesn't exist.");
                    }
                    response.status(200).json({
                        message : 'guide successfully removed'
                    });
                })
                .catch(HttpError.handle(response));
        });
};
