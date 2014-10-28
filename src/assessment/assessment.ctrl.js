"use strict";

var Q = require('q'),
    mongoose = require('mongoose-q')(),
    Assessment = mongoose.model('Assessment'),
    Guide = mongoose.model('Guide'),
    Test = mongoose.model('Test');

module.exports.fetchAll = function(req,res){
    Assessment.findQ().then(function(assessments){
        res.json(assessments);
    }).fail(function(err){
        res.json(err);
    });
};

module.exports.fetchOne = function(req,res){
    Assessment.findOne({ _id : req.params.id }).populate('guides').populate('tests').execQ().then(function(assessment){
        res.json(assessment);
    }).fail(function(err){
        res.json(err);
    });
};

module.exports.create = function(req,res){
    var assess = new Assessment(req.body);
    assess.saveQ().then(function(assess){
        res.json(assess);
    }).fail(function(err){
        res.json(err);
    });
};

module.exports.update = function(req,res){
    Assessment.findOneAndUpdateQ({ _id : req.params.id },req.body).then(function(assessment){
        res.json(assessment);
    }).fail(function(err){
        res.json(err);
    });
};

module.exports.remove = function(req,res){
    Assessment.remove({ _id : req.params.id }).execQ().then(function(){
        res.json();
    }).fail(function(err){
        res.json(err);
    });
};

module.exports.createTip = function(req,res){
    Assessment.findOneAndUpdateQ({ _id : req.params.id },{ $push : { tips : req.body.text }}).then(function(tip){
        res.json(tip);
    }).fail(function(err){
        res.json(400,err);
    });
};

module.exports.updateTip = function(req,res){
    Assessment.findOne({ _id : req.params.id }).execQ().then(function(assessment){
        assessment.tips[req.params.index] = req.body.text;
        assessment.saveQ().then(function(){
            res.json();
        });
    }).fail(function(err){
        res.json(400,err);
    });
};

module.exports.removeTip = function(req,res){
    Assessment.findOne({ _id : req.params.id }).execQ().then(function(assessment){
        delete assessment.tips[req.params.index];
        assessment.saveQ().then(function(){
            res.json();
        });
    }).fail(function(err){
        res.json(400,err);
    });
};

module.exports.moveTip = function(req,res){
    Assessment.findOne({ _id : req.params.id },function(err,assessment){
        assessment.tips.move(req.params.index,req.params.new);
        assessment.save(function(){
            res.json();
        });
    });
};

module.exports.createGuide = function(req,res){
    var guide = new Guide(req.body);
    guide.saveQ().then(function(guide){
        Assessment.findOneAndUpdateQ({ _id : req.params.id },{ $push : { guides : guide }}).then(function(){
            res.json(guide);
        }).fail(function(err){
            console.log(err);
            res.status(400).json(err);
        });
    }).fail(function(err){
        res.json(400,err);
    });
};

module.exports.removeGuide = function(req,res){
    Guide.findOneAndRemoveQ({ _id : req.params.guideId }).then(function(){
        res.json();
    }).fail(function(err){
        res.json(400,err);
    });
};

module.exports.updateGuide = function(req,res){
    Guide.findOneAndUpdateQ({ _id : req.params.guideId },req.body).then(function(){
        res.json();
    }).fail(function(err){
        res.json(400,err);
    });
};

module.exports.moveGuide = function(req,res){
    Assessment.findOne({ _id : req.params.id },function(err, assessment){
        assessment.guides.move(req.params.index,req.params.new);
        assessment.save(function(err,data){
            console.log(data.guides,err);
            res.json();
        });
    });
    //Q.all([
    //    Assessment.findOneAndUpdateQ({ _id : req.params.id },{ $pull : {  } }),
    //
    //])
    //
};

module.exports.createTest = function(req,res){
    var test = new Test(req.body);
    test.saveQ().then(function(test){
        Assessment.findOneAndUpdateQ({ _id : req.params.id },{ $push : { tests : test }}).then(function(){
            res.json(test);
        }).fail(function(err){
            res.json(400,err);
        });
    }).fail(function(err){
        res.json(400,err);
    });
};

module.exports.removeTest = function(req,res){
    Test.findOneAndRemoveQ({ _id : req.params.testId }).then(function(){
        res.json();
    }).fail(function(err){
        res.json(400,err);
    });
};

module.exports.updateTest = function(req,res){
    Test.findOneAndUpdateQ({ _id : req.params.testId },req.body).then(function(){
        res.json();
    }).fail(function(err){
        res.json(400,err);
    });
};