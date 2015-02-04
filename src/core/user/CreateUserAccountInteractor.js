function CreateUserAccountInteractor(gateway) {

    this.execute = function (action) {
        var user = gateway.create(action.username);
        return {loggedUser: user};
    };

}

module.exports = CreateUserAccountInteractor;