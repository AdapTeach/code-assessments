(function() {
  'use strict';

  var mongoose = require('mongoose-q')(),
    Assessment = mongoose.model('Assessment'),
    Guide = mongoose.model('Guide');


  module.exports.findByAssessment = function (req, res) {
    Guide.find({assessment: req.params.id})
      .execQ()
      .then(function (guides) {
        res.json(guides);
      }).fail(function (err) {
        res.status(400).json(err);
      });
  };

  module.exports.findAll = function (req, res) {
    Guide.find()
      .execQ()
      .then(function (guides) {
        res.json(guides);
      }).fail(function (err) {
        res.status(400).json(err);
      });
  };

  module.exports.create = function (req, res) {
    var guide = new Guide(req.body);
    guide.saveQ().then(function (guide) {
      Assessment.findOneAndUpdateQ({_id: req.params.id}, {$push: {guides: guide}}).then(function () {
        res.status(200).json(guide);
      }).fail(function (err) {
        res.status(400).json(err);
      });
    }).fail(function (err) {
      res.status(400).json(err);
    });
  };

  module.exports.remove = function (req, res) {
    Guide.findOneAndRemoveQ({_id: req.params.guideId}).then(function () {
      res.status(200).json();
    }).fail(function (err) {
      res.json(400, err);
    });
  };

  module.exports.update = function (req, res) {
    Guide.findOneAndUpdateQ({_id: req.params.guideId}, req.body).then(function () {
      res.status(200).json();
    }).fail(function (err) {
      res.status(400).json(err);
    });
  };

  module.exports.move = function (req, res) {
    Assessment.findOne({_id: req.params.id}, function (err, assessment) {
      assessment.guides.move(req.params.index, req.params.new);
      assessment.save(function (err, data) {
        console.log(data.guides, err);
        res.json();
      });
    });
  };
})();