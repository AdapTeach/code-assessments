"use strict";

var Q = require('q'),
  mongoose = require('mongoose-q')(),
  Assessment = mongoose.model('Assessment'),
  Guide = mongoose.model('Guide'),
  Test = mongoose.model('Test');

module.exports.fetchAll = function (req, res) {
  Assessment.find()
    .select('-guides')
    //.populate('guides')
    .execQ().then(function (assessments) {
      res.json(assessments);
    }).fail(function (err) {
      console.log(err);
      res.json(err);
    });
};

module.exports.fetchOne = function (req, res) {
  Assessment.findOne({_id: req.params.id}).populate('guides').populate('tests').execQ().then(function (assessment) {
    res.json(assessment);
  }).fail(function (err) {
    res.json(err);
  });
};

module.exports.create = function (req, res) {
  var assess = new Assessment(req.body);
  assess.saveQ().then(function (assess) {
    res.json(assess);
  }).fail(function (err) {
    res.json(err);
  });
};

module.exports.update = function (req, res) {
  Assessment.findOneAndUpdateQ({_id: req.params.id}, req.body).then(function (assessment) {
    res.json(assessment);
  }).fail(function (err) {
    res.status(400).json(err);
  });
};

module.exports.remove = function (req, res) {
  Assessment.remove({_id: req.params.id}).execQ().then(function () {
    res.json();
  }).fail(function (err) {
    res.status(400).json(err);
  });
};