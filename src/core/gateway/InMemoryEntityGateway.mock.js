var Future = require('bluebird');

var Errors = require('../error/Errors');

function InMemoryEntityGateway() {

    var idCounter = 1;

    var entities = {};

    this.get = function (id) {
        return new Future(function (resolve, reject) {
            var assessment = entities[id];
            if (assessment) resolve(assessment);
            else reject(Errors.entityNotFound('No entity found for id ' + id));
        });
    };

    this.save = function (entity) {
        return new Future(function (resolve, reject) {
            if (!entity) reject(new Error('Entity required'));
            var id = idCounter++;
            entities[id] = entity;
            entity.id = id;
            resolve(entity);
        });
    };

    this.addSpies = function () {
        spyOn(this, 'get').and.callThrough();
        spyOn(this, 'save').and.callThrough();
    };

}

module.exports = InMemoryEntityGateway;