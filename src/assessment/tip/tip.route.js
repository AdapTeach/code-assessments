(function() {
  'use strict';

  var tipCtrl = require('./tip.ctrl');

  module.exports = function (app) {

    app.route('/tip')
      .get(tipCtrl.findAll);

    app.route('/assessment/:id/tip')
      .post(tipCtrl.create)
      .get(tipCtrl.findByAssessment);

    app.route('/assessment/:id/tip/:index')
      .delete(tipCtrl.remove)
      .put(tipCtrl.update);

    app.route('/assessment/:id/tip/:index/move/:new')
      .put(tipCtrl.move);

  };

})();