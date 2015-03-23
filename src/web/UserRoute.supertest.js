var request = require('supertest'),
    express = require('express');

var app = express();

describe('GET /users', function () {
    it('respond with json', function (done) {
        //expect(true).toBe(false);
        request(app)
            .get('/user')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});