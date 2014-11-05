(function() {
  'use strict';

  var testCtrl = require('./test.ctrl');

  module.exports = function (app) {

    app.route('/test')
      .get(testCtrl.findAll);

    app.route('/assessment/:id/test')
      .post(testCtrl.create)
      .get(testCtrl.findByAssessment);

    app.route('/assessment/:id/test/:testId')
      .delete(testCtrl.remove)
      .put(testCtrl.update);

  };
})();