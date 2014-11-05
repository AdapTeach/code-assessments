(function() {
  'use strict';

  var guideCtrl = require('./guide.ctrl');

  module.exports = function (app) {

    app.route('/guide')
      .get(guideCtrl.findAll);

    app.route('/assessment/:id/guide')
      .post(guideCtrl.create)
      .get(guideCtrl.findByAssessment);

    app.route('/assessment/:id/guide/:guideId')
      .put(guideCtrl.update)
      .delete(guideCtrl.remove);

    app.route('/assessment/:id/guide/:index/move/:new')
      .put(guideCtrl.move);

  };
})();