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
            Guide.find(request.params.id, request.body)
                .execQ()
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
        .put(function(request,response){
            Guide.findOneAndUpdate({_id: request.params.guideId}, request.body)
                .execQ()
                .then(function () {
                    response.json();
                })
                .catch(HttpError.handle(response));
        })
        .delete(function(request,response){
            Guide.findOneAndRemove({_id: req.params.guideId})
                .execQ()
                .then(function () {
                    response.status(200).json();
                })
                .catch(HttpError.handle(response));
        });
};
