var request = require('supertest');

describe('ContactsController', function() {

  describe('#save()', function() {
  	describe('with valid params', function() {
	    it('should redirect to /contact ', function (done) {
	   	  var validParam = { name: 'test', password: 'test' };

	      request(sails.hooks.http.app)
	        .post('/contacts')
	        .send(validParam)
	        .expect('Content-Type', /text/)
			.expect(200)
			.expect('Contact saved!', done);
	    });
    });
  });

});