var mongoose = require('mongoose-q')(require('mongoose')),
    Tips = mongoose.model('Tip'),
    Assessment = mongoose.model('Assessment'),
    HttpError = require('../../error/HttpError');

module.exports = function (app) {

    app.route('/tip')
        .get(function(request,response){
            Tips.find()
                .execQ()
                .then(function sendResponse(tips) {
                    response.json(tips);
                })
                .catch(HttpError.handle(response));
        });

    app.route('/assessment/:id/tip')
        .post(function(request,response){
            Tips.create(request.params.id, request.body)
                .then(function sendResponse(tip){
                    response.json(tip);
                })
                .catch(HttpError.handle(response));
        })
        .get(function(request,response){
            Tips.find({assessment: req.params.id})
                .execQ()
                .then(function sendResponse(guides) {
                    res.json(guides);
                })
                .catch(HttpError.handle(response));
        });

    app.route('/assessment/:id/tip/:index')
        .delete(function(request,response){
            Tips.remove({_id: request.params.tipId})
                .then(function () {
                    res.json();
                })
                .catch(HttpError.handle(response));
        })
        .put(function(request,response) {
            Tips.findOneAndUpdate({_id: req.params.tipId})
                .execQ()
                .then(function (tip) {
                    response.json(tip);
                }).fail(HttpError.handle(response));
        });
};