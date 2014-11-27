var q = require('q'),
    mongoose = require("mongoose-q")(require('mongoose')),
    Schema = mongoose.Schema,
    GuideSchema = new Schema({
        title: {
            type: String,
            required : 'title is required'
        },
        code: {
            type: String,
            required : 'code is required'
        },
        assessment: {
            type: Schema.ObjectId,
            ref: 'Assessment',
            required : 'a guide must belong to an assessment'
        }
    }),
    Assessment = mongoose.model('Assessment');

GuideSchema.statics.create = function(assessmentId,guide){
    var deferred = q.defer();
    var newGuide = new this(guide);
    newGuide.saveQ().then(function (guide) {
        Assessment.findOneAndUpdate({_id: assessmentId}, {$push: {guides: guide}})
            .execQ()
            .then(function () {
                deferred.resolve(guide);
            });
    }).catch(function (err) {
        deferred.reject(err);
    });
    return deferred.promise;
};

module.exports = mongoose.model('Guide', GuideSchema);;