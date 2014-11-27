var q = require('q'),
    mongoose = require("mongoose-q")(require('mongoose')),
    Schema = mongoose.Schema,
    TestSchema = new Schema({
        title: {
            type: String,
            required: 'title is required'
        },
        code: {
            type: String,
            required: 'code is required'
        },
        expectations: [{
            type: String,
            required: 'expectations is required'
        }],
        assessment: {
            type: Schema.ObjectId,
            ref: 'Assessment'
        }
    }),
    Assessment = mongoose.model('Assessment');

TestSchema.statics.create = function(assessmentId,test){
    var deferred = q.defer();
    var newTest = new this(test);
    newTest.saveQ().then(function (createdTest) {
        Assessment.findOneAndUpdate({_id: assessmentId}, {$push: {tests: createdTest._id}})
            .execQ()
            .then(function () {
                deferred.resolve(createdTest);
            });
    }).catch(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
};

module.exports = mongoose.model('Test', TestSchema);;