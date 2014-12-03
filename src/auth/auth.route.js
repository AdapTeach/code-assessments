var authVerifier = require('./auth.verifier'),
    ensureAuthenticated = require('./auth.middleware').ensureAuthenticated;


module.exports = function (app) {

    app.post('/login', function (request, response) {
        authVerifier.verify(request.body.assertion)
            .then(function authenticateIfOkay(user) {
                response.json(user);
            })
            .catch(function (error) {
                console.log(error);
                response.status(500).send(error);
            });
    });

    app.get('/me', ensureAuthenticated, function (req, res) {
        //User.findById(req.user, function (err, user) {
        //    res.send(user);
        //});
    });

    app.put('/me', ensureAuthenticated, function (req, res) {
        //User.findById(req.user, function (err, user) {
        //    if (!user) {
        //        return res.status(400).send({message: 'User not found'});
        //    }
        //    user.displayName = req.body.displayName || user.displayName;
        //    user.email = req.body.email || user.email;
        //    user.save(function (err) {
        //        res.status(200).end();
        //    });
        //});
    });

};