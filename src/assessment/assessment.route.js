var assessmentCtrl = require('./assessment.ctrl'),
    stubs = require('../stub/assessments');

module.exports = function (app) {

    stubs.publish(app);

    app.get('/assessment', assessmentCtrl.fetchAll);
    app.post('/assessment', assessmentCtrl.create);
    app.route('/assessment/:id')
        .get(assessmentCtrl.fetchOne)
        .put(assessmentCtrl.update)
        .delete(assessmentCtrl.remove);

    app.route('/assessment/:id/guide')
        .post(assessmentCtrl.createGuide);

    app.route('/assessment/:id/guide/:guideId')
        .put(assessmentCtrl.updateGuide)
        .delete(assessmentCtrl.removeGuide);

    app.route('/assessment/:id/test')
        .post(assessmentCtrl.createTest);

    app.route('/assessment/:id/test/:testId')
        .delete(assessmentCtrl.removeTest)
        .put(assessmentCtrl.updateTest);

    app.route('/assessment/:id/tip')
        .post(assessmentCtrl.createTip)
        .delete(assessmentCtrl.removeTip);
};