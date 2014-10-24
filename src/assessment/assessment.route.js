var assessmentCtrl = require('./assessment.ctrl'),
    stubs = require('../stub/assessments');

module.exports = function (app) {

    stubs.publish(app);

    app.get('/assessments', assessmentCtrl.fetchAll);
    app.post('/assessment', assessmentCtrl.create);
    app.route('/assessment/:id')
        .get(assessmentCtrl.fetchOne)
        .put(assessmentCtrl.update)
        .delete(assessmentCtrl.remove);
};