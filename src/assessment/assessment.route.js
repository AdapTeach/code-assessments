var Assessment = require('./assessment.model'),
    HttpError = require('../error/HttpError');

module.exports = function (app) {

    app.route('/assessment')
        .get(function(request,response){
            Assessment.find()
                .execQ()
                .then(function sendResponse(assessments){
                    response.status().json(assessments);
                })
                .catch(HttpError.handle(response));
        })
        .post(function(request,response){
            var assess = new Assessment(request.body);
            assess
                .saveQ()
                .then(function sendResponse(assess) {
                    response.status(200).json(assess);
                })
                .catch(HttpError.handle(response));
        });

    app.route('/assessment/:id')
        .get(function(request,response){
            Assessment
                .findOne({_id: request.params.id})
                .populate('guides')
                .populate('tests')
                .execQ()
                .then(function sendResponse(assessment) {
                    if(!assessment){
                        HttpError.throw(400,"The assessment you're looking at doesn't exist.");
                    }
                    response.status(200).json(assessment);
                }).catch(HttpError.handle(response));
        })
        .put(function(request,response){
            Assessment
                .findOneAndUpdateQ({_id: request.params.id}, request.body)
                .then(function sendResponse(assessment) {
                    if(!assessment){
                        HttpError.throw(400,"The assessment you're looking at doesn't exist.");
                    }
                    response.json(assessment);
                })
                .fail(HttpError.handle(response));
        })
        .delete(function(request,response){
            Assessment
                .remove({_id: request.params.id}).execQ()
                .then(function sendResponse(nb) {
                    if(nb === 0){
                        HttpError.throw(400,"The assessment you're looking at doesn't exist.");
                    }
                    response.status(200).json({
                        message : 'assessment successfully removed'
                    });
                })
                .fail(HttpError.handle(response));
        });


    //change the index of a guide in an assessment's array of guide
    app.route('/assessment/:id/guide/move/:from/to/:to')
        .put(function(request,response){
            Assessment
                .findOne({_id: request.params.id})
                .execQ()
                .then(function (assessment) {
                    return assessment.moveGuide(request.params.from, request.params.to);
                })
                .then(function(){
                    response.status(200).json({
                        message : 'success'
                    });
                })
                .catch(HttpError.handle(response));
        });

    //tips management
    //change the index of a tip in an assessment's array of tip
    app.route('/assessment/:id/tip/move/:from/to/:to')
        .put(function(request,response){
            Assessment
                .findOne({_id: request.params.id})
                .execQ()
                .then(function (assessment) {
                    if(!assessment){
                        HttpError.throw(400,"The assessment you're looking at doesn't exist.");
                    }
                    assessment.moveTips(request.params.from, request.params.to);
                })
                .then(function(){
                    response.status(200).send();
                })
                .catch(HttpError.handle(response));
        });

    app.route('/assessment/:id/tip')
        .post(function(request,response){
            Assessment
                .findOneAndUpdate({ _id : request.params.id },{ $push : { tips : request.body } })
                .execQ()
                .then(function(){
                    response.status(200).send();
                })
                .catch(HttpError.handle(response));
        });


    app.route('/assessment/:id/tip/:index')
        .delete(function(request,response){
            Assessment
                .findOneAndUpdate({ _id : request.params.id },{ $pull : { tips : request.body } })
                .execQ()
                .then(function(){
                    response.status(200).json({
                        message : 'success'
                    });
                })
                .catch(HttpError.handle(response));
        });
};