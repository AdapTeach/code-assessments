var q = require('q'),
    mongoose = require("mongoose-q")(require('mongoose')),
    Schema = mongoose.Schema,
    TipSchema = new Schema({
        title: {
            type: String
        },
        content: {
            type: String
        },
        assessment: {
            type: Schema.ObjectId,
            ref: 'Assessment'
        }
    }),
    Assessment = mongoose.model('Assessment');


TipSchema.statics.create = function(assessmentId,tip){
    var deferred = q.defer();
    var newTip = new Tips(tip);
    newTip.save()
        .execQ()
        .then(function updateAssessment(createdTip) {
            Assessment.findOneAndUpdate({ _id : assessmentId },{ $push : { tips : createdTip._id }})
                .then(function(){
                    deferred.resolve(createdTip);
                });
        })
        .catch(function(err){
            deferred.reject(err);
        });
    return deferred.promise;
};

var Tips = mongoose.model('Tip',TipSchema);
module.exports = Tips;