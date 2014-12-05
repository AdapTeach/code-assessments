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

};