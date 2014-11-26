var q = require('q'),
    mongoose = require("mongoose-q")(require('mongoose')),
    Schema = mongoose.Schema,
    GuideSchema = new Schema({
        title: {
            type: String
        },
        code: {
            type: String
        },
        assessment: {
            type: Schema.ObjectId,
            ref: 'Assessment'
        }
    }),
    Assessment = mongoose.model('Assessment');

GuideSchema.statics.create = function(assessmentId,guide){
    var deferred = q.defer();
    var newGuide = new Guide(guide);
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

var Guide = mongoose.model('Guide', GuideSchema);
module.exports = Guide;