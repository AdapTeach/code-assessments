var mongoose = require('mongoose-q')(require('mongoose')),
    Assessment = mongoose.model('Assessment'),
    HttpError = require('../error/HttpError');

module.exports = function (app) {

    app.route('/assessment')
        .get(function(request,response){
            Assessment.find().execQ()
                .then(function sendResponse(assessments){
                    response.json(assessments);
                })
                .catch(HttpError.handle(response));
        })
        .post(function(request,response){
            var assess = new Assessment(request.body);
            assess.save().execQ()
                .then(function sendResponse(assess) {
                    response.json(assess);
                })
                .catch(HttpError.handle(response));
        });

    app.route('/assessment/:id')
        .get(function(request,response){
            Assessment.findOne({_id: req.params.id})
                .populate('guides')
                .populate('tests')
                .execQ()
                .then(function sendResponse(assessment) {
                    response.json(assessment);
                }).catch(HttpError.handle(response));
        })
        .put(function(request,response){
            Assessment.findOneAndUpdateQ({_id: req.params.id}, req.body)
                .then(function sendResponse(assessment) {
                    response.json(assessment);
                })
                .fail(HttpError.handle(response));
        })
        .delete(function(request,response){
            Assessment.remove({_id: req.params.id}).execQ()
                .then(function sendResponse() {
                    response.json();
                })
                .fail(HttpError.handle(response));
        });

    //change the index of a tip in an assessment's array of tip
    app.route('/assessment/:id/tip/:index/move/:new')
        .put(function(request,response){
            Assessment.findOne({_id: req.params.id})
                .execQ()
                .then(function (assessment) {
                    assessment.tips.move(req.params.index, req.params.new);
                    assessment.save(function (err) {
                        if(err){
                            throw new Error();
                        }else{
                            response.json();
                        }
                    });
                })
                .catch(HttpError.handle(response));
        });

    //change the index of a guide in an assessment's array of guide
    app.route('/assessment/:id/guide/:guideId/move/:index/to/:new')
        .put(function(request,response){
            Assessment.findOne({_id: req.params.id})
                .execQ()
                .then(function (assessment) {
                    assessment.guides.move(req.params.index, req.params.new);
                    assessment.save(function (err) {
                        if(err){
                            throw new Error();
                        }else{
                            response.json();
                        }
                    });
                })
                .catch(HttpError.handle(response));
        });
};