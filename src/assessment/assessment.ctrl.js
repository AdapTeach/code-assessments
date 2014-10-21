"use strict";

var mongoose = require('mongoose-q')(),
    Assessment = mongoose.model('Assessment');

module.exports.fetchAll = function(req,res){
    Assessment.findQ().then(function(assessments){
        res.json(assessments);
    }).fail(function(err){
        res.json(err);
    })
};

module.exports.fetchOne = function(req,res){
    Assessment.findOne({ _id : req.params.id }).execQ().then(function(assessment){
        res.json(assessment);
    }).fail(function(err){
        res.json(err);
    })
};

module.exports.create = function(req,res){
    var assess = new Assessment(req.body);
    assess.saveQ().then(function(assess){
        res.json(assess);
    }).fail(function(err){
        res.json(err);
    })
};

module.exports.update = function(req,res){
    Assessment.findOneAndUpdateQ({ _id : req.params.id },req.body).then(function(assessment){
        res.json(assessment);
    }).fail(function(err){
        res.json(err);
    })
};

module.exports.remove = function(req,res){
    Assessment.remove({ _id : req.params.id }).execQ().then(function(){
        res.json();
    }).fail(function(err){
        res.json(err);
    })
};