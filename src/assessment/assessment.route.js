var assessmentCtrl = require('./assessment.ctrl'),
    stubs = require('../grade/routes');

module.exports = function (app) {

    stubs.publish(app);

    app.route('/assessment')
        .get(assessmentCtrl.fetchAll)
        .post(assessmentCtrl.create);

    app.route('/assessment/:id')
        .get(assessmentCtrl.fetchOne)
        .put(assessmentCtrl.update)
        .delete(assessmentCtrl.remove);

    app.route('/assessment/:id/guide')
        .post(assessmentCtrl.createGuide);

    app.route('/assessment/:id/guide/:guideId')
        .put(assessmentCtrl.updateGuide)
        .delete(assessmentCtrl.removeGuide);

    app.route('/assessment/:id/guide/:index/move/:new')
        .put(assessmentCtrl.moveGuide);

    app.route('/assessment/:id/test')
        .post(assessmentCtrl.createTest);

    app.route('/assessment/:id/test/:testId')
        .delete(assessmentCtrl.removeTest)
        .put(assessmentCtrl.updateTest);

    app.route('/assessment/:id/tip')
        .post(assessmentCtrl.createTip);

    app.route('/assessment/:id/tip/:index')
        .delete(assessmentCtrl.removeTip)
        .put(assessmentCtrl.updateTip);

    app.route('/assessment/:id/tip/:index/move/:new')
        .put(assessmentCtrl.moveTip);
};