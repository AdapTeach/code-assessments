var assessmentCtrl = require('./assessment.ctrl');

module.exports = function(app){
    app.get('/assessment',assessmentCtrl.fetchAll);
    app.post('/assessment',assessmentCtrl.create);
    app.route('/assessment/:id')
        .get(assessmentCtrl.fetchOne)
        .put(assessmentCtrl.update)
        .delete(assessmentCtrl.remove);
};