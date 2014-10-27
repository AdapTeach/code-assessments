var assessmentCtrl = require('./assessment.ctrl'),
    stubs = require('../grade/routes');

module.exports = function (app) {

    stubs.publish(app);

    app.get('/assessment', assessmentCtrl.fetchAll);
    app.post('/assessment', assessmentCtrl.create);
    app.route('/assessment/:id')
        .get(assessmentCtrl.fetchOne)
        .put(assessmentCtrl.update)
        .delete(assessmentCtrl.remove);
};