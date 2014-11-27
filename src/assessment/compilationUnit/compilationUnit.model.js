var q = require('q'),
    mongoose = require("mongoose-q")(require('mongoose')),
    Schema = mongoose.Schema,
    CompilationUnitSchema = new Schema({
        name: {
            type: String,
            required : 'name is required'
        },
        code: {
            type: String,
            required : 'code is required'
        },
        type : {
            type : String,
            required : 'type is required'
        },
        assessment: {
            type: Schema.ObjectId,
            ref: 'Assessment',
            required : 'a CompilationUnit must belong to an assessment'
        }
    }),
    Assessment = mongoose.model('Assessment');

CompilationUnitSchema.statics.create = function(assessmentId,compilationUnit){
    var deferred = q.defer(),
        newCompilationUnit = new this(compilationUnit),
        params = {};

    newCompilationUnit.saveQ()
        .then(function (createdCompilationUnit) {
            if(compilationUnit.type == 'provided'){
                params =  {$push: {providedCompilationUnits: createdCompilationUnit._id}};
            }else{
                params = {$push: {compilationUnitsToSubmit: createdCompilationUnit._id}};
            }
            Assessment.findOneAndUpdate({_id: assessmentId}, params)
                .execQ()
                .then(function () {
                    deferred.resolve(createdCompilationUnit);
                });
        })
        .catch(function (err) {
            deferred.reject(err);
        });
    return deferred.promise;
};

module.exports = mongoose.model('CompilationUnit',CompilationUnitSchema);