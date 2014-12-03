var Assessment = require('./assessment.model'),
    HttpError = require('../error/HttpError'),
    ensureAuthenticated = require('../auth/auth.middleware').ensureAuthenticated;

module.exports = function (app) {

    app.route('/assessment')
        .get(ensureAuthenticated,function(request,response){
            Assessment.find({ creator : request.user._id })
                .execQ()
                .then(function sendResponse(assessments){
                    response.status(200).json(assessments);
                })
                .catch(HttpError.handle(response));
        })
        .post(ensureAuthenticated,function(request,response){
            var assess = new Assessment(request.body);
            assess.creator = request.user._id;
            assess
                .saveQ()
                .then(function sendResponse(assess) {
                    response.status(200).json(assess);
                })
                .catch(HttpError.handle(response));
        })
        .put(ensureAuthenticated,function(request,response){
            Assessment
                .findOneAndUpdateQ({_id: request.body._id}, request.body)
                .then(function sendResponse(assessment) {
                    if(!assessment){
                        HttpError.throw(400,"The assessment you're looking at doesn't exist.");
                    }
                    var data = {
                        _id : assessment._id,
                        title : assessment.title
                    };
                    response.json(data);
                })
                .fail(HttpError.handle(response));
        });

    app.route('/assessment/:id')
        .get(ensureAuthenticated,function(request,response){
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
        .put(ensureAuthenticated,function(request,response){
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
        .delete(ensureAuthenticated,function(request,response){
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
    app.route(ensureAuthenticated,'/assessment/:id/guide/move/:from/to/:to')
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
        .put(ensureAuthenticated,function(request,response){
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

    app.route(ensureAuthenticated,'/assessment/:id/tip')
        .post(function(request,response){
            Assessment
                .findOneAndUpdate({ _id : request.params.id },{ $push : { tips : request.body } })
                .execQ()
                .then(function(){
                    response.status(200).send();
                })
                .catch(HttpError.handle(response));
        });


    app.route(ensureAuthenticated,'/assessment/:id/tip/:index')
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