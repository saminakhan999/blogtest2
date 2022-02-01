const request = require('supertest');
const app = require('../app');

describe('app', function() {
    test('responds with a 200 on success', function(done) {
      request(app)
        .get('/')
        .expect(200, done);
    });
});
