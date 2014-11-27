var q = require('q'),
    mongoose = require("mongoose-q")(require('mongoose')),
    Schema = mongoose.Schema,
    AssessmentSchema = new Schema({
        id : {
            type: String,
            unique: true,
            required : 'id is required'
        },
        title: {
            type: String,
            unique: true,
            required: 'title is required'
        },
        instructions: {
            type: String,
            required: 'instructions are required'
        },
        startCode: {
            type: String,
            required: 'startCode is required'
        },
        creator : {
            type : Schema.ObjectId,
            ref : 'User'
            //required : 'creator is required'
        },
        tips: [],
        guides: [{
            type: Schema.ObjectId,
            ref: 'Guide'
        }],
        tests: [{
            type: Schema.ObjectId,
            ref: 'Test'
        }],
        providedCompilationUnits: [],
        compilationUnitsToSubmit: []
    });


AssessmentSchema.methods.moveTips = function(from, to){
    var deferred = q.defer();
    this.tips.move(from,to);
    this.save(function(err){
        if(err){
            deferred.reject(err);
        }
        deferred.resolve();
    });
    return deferred.promise;
};

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