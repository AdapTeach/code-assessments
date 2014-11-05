(function() {
  'use strict';

  var mongoose = require('mongoose-q')(),
    Assessment = mongoose.model('Assessment'),
    Tip = mongoose.model('Guide');

  module.exports.create = function (req, res) {
    var tip = new Tip(req.body);
    tip.saveQ().then(function (tip) {
      res.status(200).json(tip);
    }).fail(function (err) {
      res.status(400).json(err);
    });
  };

  module.exports.update = function (req, res) {
    Assessment.findOneAndUpdateQ({_id: req.params.tipId}).then(function (tip) {
      res.status(200).json(tip);
    }).fail(function (err) {
      res.status(400).json(err);
    });
  };

  module.exports.remove = function (req, res) {
    Tip.remove({_id: req.params.tipId}).then(function () {
      res.status(200).json();
    }).fail(function (err) {
      res.status(400).json(err);
    });
  };

  module.exports.move = function (req, res) {
    Assessment.findOne({_id: req.params.id}, function (err, assessment) {
      assessment.tips.move(req.params.index, req.params.new);
      assessment.save(function () {
        res.json();
      });
    });
  };

  module.exports.findByAssessment = function (req, res) {
    Tip.find({assessment: req.params.id})
      .execQ()
      .then(function (guides) {
        res.json(guides);
      }).fail(function (err) {
        res.status(400).json(err);
      });
  };

  module.exports.findAll = function (req, res) {
    Tip.find()
      .execQ()
      .then(function (guides) {
        res.json(guides);
      }).fail(function (err) {
        res.status(400).json(err);
      });
  };
})();