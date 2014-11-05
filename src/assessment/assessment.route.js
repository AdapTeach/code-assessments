var assessmentCtrl = require('./assessment.ctrl');

module.exports = function (app) {

  app.route('/assessment')
    .get(assessmentCtrl.fetchAll)
    .post(assessmentCtrl.create);

  app.route('/assessment/:id')
    .get(assessmentCtrl.fetchOne)
    .put(assessmentCtrl.update)
    .delete(assessmentCtrl.remove);

};