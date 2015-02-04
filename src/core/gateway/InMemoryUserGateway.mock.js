var InMemoryEntityGateway = require('./InMemoryEntityGateway.mock');

function InMemoryUserGateway() {

}

InMemoryUserGateway.prototype = new InMemoryEntityGateway();

module.exports = InMemoryUserGateway;