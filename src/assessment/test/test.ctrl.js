(function() {
  'use strict';

  var mongoose = require('mongoose-q')(),
    Assessment = mongoose.model('Assessment'),
    Test = mongoose.model('Test');

  module.exports.findByAssessment = function (req, res) {
    Test.find({assessment: req.params.id})
      .execQ()
      .then(function (tests) {
        res.json(tests);
      }).fail(function (err) {
        res.status(400).json(err);
      });
  };

  module.exports.findAll = function (req, res) {
    Test.find()
      .execQ()
      .then(function (tests) {
        res.json(tests);
      }).fail(function (err) {
        res.status(400).json(err);
      });
  };

  module.exports.create = function (req, res) {
    var test = new Test(req.body);
    test.saveQ().then(function (test) {
      Assessment.findOneAndUpdateQ({_id: req.params.id}, {$push: {tests: test}}).then(function () {
        res.json(test);
      }).fail(function (err) {
        console.log(err);
        res.status(400).json(err);
      });
    }).fail(function (err) {
      console.log(err);

      res.status(400).json(err);
    });
  };

  module.exports.remove = function (req, res) {
    Test.findOneAndRemoveQ({_id: req.params.testId}).then(function () {
      res.json();
    }).fail(function (err) {
      res.json(400, err);
    });
  };

  module.exports.update = function (req, res) {
    Test.findOneAndUpdateQ({_id: req.params.testId}, req.body).then(function (newTest) {
      res.json(newTest);
    }).fail(function (err) {
      res.json(400, err);
    });
  };
})();