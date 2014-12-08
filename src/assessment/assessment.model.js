var q = require('q'),
    mongoose = require("mongoose-q")(require('mongoose')),
    Schema = mongoose.Schema,
    AssessmentSchema = new Schema({
        title: {
            type: String,
            unique: true,
            required: 'title is required'
        },
        instructions: {
            type: String,
            required: 'instructions are required'
        },
        creator : {
            type : String,
            required : 'creator is required'
        },
        guides: [{
            type: Schema.ObjectId,
            ref: 'Guide'
        }],
        tests: [{
            type: Schema.ObjectId,
            ref: 'Test'
        }],
        providedCompilationUnits: [{
            type: Schema.ObjectId,
            ref: 'CompilationUnit'
        }],
        compilationUnitsToSubmit: [{
            type: Schema.ObjectId,
            ref: 'CompilationUnit'
        }]
    });

AssessmentSchema.methods.moveGuide = function(from, to){
    var deferred = q.defer();
    this.guides.move(from,to);
    this.save(function(err){
        if(err){
            deferred.reject(err);
        }
        deferred.resolve();
    });
    return deferred.promise;
};
var Assessment = mongoose.model('Assessment',AssessmentSchema);

module.exports = Assessment;