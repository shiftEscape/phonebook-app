var request = require('supertest');

describe('ContactsController', function() {

  var STATUS_SUCCESS = 200;

  describe('#save()', function() {

    function execRequest(param, expectedResult, done) {
      request(sails.hooks.http.app)
          .post('/contacts')
          .send(param)
          .expect('Content-Type', /text/)
      .expect(STATUS_SUCCESS)
      .expect(expectedResult, done);
    }

    describe('with valid params', function() {
      it('should redirect to /contact with success message', function (done) {
        var validParam = { contact_name: 'test', contact_num: '123' };
        execRequest(validParam, 'Contact saved!', done);
      });
    });

    describe('with missing params', function() {
      it('should redirect to /contact with Missing contact name', function (done) {
        var missingContactName = { contact_name: '', contact_num: '12345' },
          expectedResult = 'Missing contact name';
        execRequest(missingContactName, expectedResult, done);
      });

      it('should redirect to /contact with Missing contact number', function (done) {
        var missingContactNumber = { contact_name: 'Joe Joey', contact_num: '' },
          expectedResult = 'Missing contact number';
        execRequest(missingContactNumber, expectedResult, done);
      });

      it('should redirect to /contact with Missing contact name and number', function (done) {
        var missingContact = { contact_name: '', contact_num: '' },
          expectedResult = 'Missing contact details';
        execRequest(missingContact, expectedResult, done);
      });
    });

  });

});