var Type = {
    ENTITY_NOT_FOUND: 'ENTITY_NOT_FOUND',
    INVALID_ACTION: 'INVALID_ACTION',
    LOGIN_REQUIRED: 'LOGIN_REQUIRED'
};

var ValidationError = {

    Type: Type,

    entityNotFound: error(Type.ENTITY_NOT_FOUND),
    invalidAction: error(Type.INVALID_ACTION),
    loginRequired: error(Type.LOGIN_REQUIRED)

};

function error(type) {
    return function (message) {
        return {
            type: type,
            message: message
        };
    };
}

module.exports = ValidationError;