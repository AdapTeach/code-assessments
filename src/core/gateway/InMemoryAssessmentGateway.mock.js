var InMemoryEntityGateway = require('./InMemoryEntityGateway.mock');

function InMemoryAssessmentGateway() {

}

InMemoryAssessmentGateway.prototype = new InMemoryEntityGateway();

module.exports = InMemoryAssessmentGateway;