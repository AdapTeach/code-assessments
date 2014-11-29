var CompilationUnit = require('./compilationUnit.model'),
    HttpError = require('../../error/HttpError');

module.exports = function (app) {

    app.route('/assessment/:id/compilationunit')
        .get(function (request, response) {
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
        .post(function (request, response) {
           CompilationUnit
               .create(request.params.id,request.body)
               .then(function(compilationUnit){
                   response.status(200).json(compilationUnit);
               })
               .catch(HttpError.handle(response));
        });

    app.route('/assessment/:id/compilationunit/:cuId')
        .get(function (request, response) {
            CompilationUnit
                .find({ _id : request.params.cuId })
                .execQ()
                .then(function sendResponse(compilationUnit) {
                    response.status(200).json(compilationUnit);
                })
                .catch(HttpError.handle(response));
        })
        .delete(function (request, response) {
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
        .put(function (request, response) {
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