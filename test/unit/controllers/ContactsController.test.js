var request = require('supertest');

describe('ContactsController', function() {

  describe('#save()', function() {
  	var STATUS_SUCCESS = 200;

  	describe('with valid params', function() {
	    it('should redirect to /contact with success message', function (done) {
	   	  var validParam = { contact_name: 'test', contact_num: 'test' };

	      request(sails.hooks.http.app)
	        .post('/contacts')
	        .send(validParam)
	        .expect('Content-Type', /text/)
			.expect(STATUS_SUCCESS)
			.expect('Contact saved!', done);
	    });
    });

    describe('with missing params', function() {
	    it('should redirect to /contact with Missing contact name', function (done) {
	   	  var missingContactName = { contact_name: '', contact_num: '12345' },
	   	  	expectedResult = 'Missing contact name';

	      request(sails.hooks.http.app)
	        .post('/contacts')
	        .send(missingContactName)
	        .expect('Content-Type', /text/)
			.expect(STATUS_SUCCESS)
			.expect(expectedResult, done);
	    });
    });
  });

});