var CompilationUnit = require('./compilationUnit.model'),
    HttpError = require('../../web/HttpError'),
    ensureAuthenticated = require('../../auth/auth.middleware').ensureAuthenticated;

module.exports = function (app) {

    app.route('/assessment/:id/compilationunit')
        .get(ensureAuthenticated,function (request, response) {
            var params = {};
            if(request.query.type){
                params = { assessment : request.params.id , type : request.query.type};
            }else{
                params = { assessment : request.params.id };
            }
            CompilationUnit
                .find(params)
                .execQ()
                .then(function sendResponse(compilationUnits) {
                    response.status(200).json(compilationUnits);
                })
                .catch(HttpError.handle(response));
        })
        .post(ensureAuthenticated,function (request, response) {
            request.body.creator = request.user._id;
            request.body.assessment = request.params.id;
            CompilationUnit
               .create(request.params.id,request.body)
               .then(function(compilationUnit){
                   response.status(200).json(compilationUnit);
               })
               .catch(HttpError.handle(response));
        })
        .put(ensureAuthenticated,function (request, response) {
            var id = request.body._id;
            delete request.body._id;
            CompilationUnit
                .findOneAndUpdate({_id: id}, request.body)
                .execQ()
                .then(function (compilationUnit) {
                    if(!compilationUnit){
                        HttpError.throw(400,"The compilation unit you're looking at doesn't exist.");
                    }
                    response.status(200).json(compilationUnit);
                })
                .catch(HttpError.handle(response));
        });

    app.route('/assessment/:id/compilationunit/:cuId')
        .get(ensureAuthenticated,function (request, response) {
            CompilationUnit
                .findOne({ _id : request.params.cuId })
                .execQ()
                .then(function sendResponse(compilationUnit) {
                    response.status(200).json(compilationUnit);
                })
                .catch(HttpError.handle(response));
        })
        .delete(ensureAuthenticated,function (request, response) {
            CompilationUnit
                .findOneAndRemove({_id: request.params.cuId})
                .execQ()
                .then(function (nb) {
                    if(nb===0){
                        HttpError.throw(400,"The compilation unit you're looking at doesn't exist.");
                    }
                    response.status(200).json({
                        message : 'compilation unit successfully removed'
                    });
                })
                .catch(HttpError.handle(response));
        })
        .put(ensureAuthenticated,function (request, response) {
            delete request.body._id;
            CompilationUnit
                .findOneAndUpdate({_id: request.params.cuId}, request.body)
                .execQ()
                .then(function (compilationUnit) {
                    if(!compilationUnit){
                        HttpError.throw(400,"The compilation unit you're looking at doesn't exist.");
                    }
                    response.status(200).json(compilationUnit);
                })
                .catch(HttpError.handle(response));
        });
};