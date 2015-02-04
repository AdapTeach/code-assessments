function CreateUserAccountInteractor(gateway) {

    this.execute = function (action) {
        return gateway.save(action.user)
            .then(function (user) {
                return {user: user};
            });
    };

}

module.exports = CreateUserAccountInteractor;