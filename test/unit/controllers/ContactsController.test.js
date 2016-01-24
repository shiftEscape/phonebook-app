var request = require('supertest');

describe('ContactsController', function() {

  const STATUS_SUCCESS = 200;

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
      it('should redirect to /contact with success message after contact creation', function (done) {
        var validParam = { contact_name: 'test', contact_num: '123' },
          expectedResult = 'Contact saved!';
        execRequest(validParam, expectedResult, done);
      });
    });

    describe('with missing params', function() {
      it('should redirect to /contact with missing contact name', function (done) {
        var missingContactName = { contact_name: '', contact_num: '12345' },
          expectedResult = 'Missing contact name';
        execRequest(missingContactName, expectedResult, done);
      });

      it('should redirect to /contact with missing contact number', function (done) {
        var missingContactNumber = { contact_name: 'Joe Joey', contact_num: '' },
          expectedResult = 'Missing contact number';
        execRequest(missingContactNumber, expectedResult, done);
      });

      it('should redirect to /contact with missing contact name and number', function (done) {
        var missingContact = { contact_name: '', contact_num: '' },
          expectedResult = 'Missing contact details';
        execRequest(missingContact, expectedResult, done);
      });
    });

  });

  describe('#update()', function() {

    function execRequest(param, expectedResult, done) {
      request(sails.hooks.http.app)
        .put('/contacts/1')
        .send(param)
        .expect('Content-Type', /text/)
        .expect(STATUS_SUCCESS)
        .expect(expectedResult, done);
    }

    describe('with valid params', function() {
      it('should redirect to /contact with success message after updating', function (done) {
        var validParam = { contact_name: 'test', contact_num: '123' },
          expectedResult = 'Contact updated!';
        execRequest(validParam, expectedResult, done);
      });
    });

    describe('with missing params', function() {
      it('should redirect to /contact with missing contact name', function (done) {
        var missingContactName = { contact_name: '', contact_num: '12345' },
          expectedResult = 'Missing contact name';
        execRequest(missingContactName, expectedResult, done);
      });

      it('should redirect to /contact with missing contact number', function (done) {
        var missingContactNumber = { contact_name: 'Joe Joey', contact_num: '' },
          expectedResult = 'Missing contact number';
        execRequest(missingContactNumber, expectedResult, done);
      });

      it('should redirect to /contact with missing contact name and number', function (done) {
        var missingContact = { contact_name: '', contact_num: '' },
          expectedResult = 'Missing contact details';
        execRequest(missingContact, expectedResult, done);
      });
    });

  });

});