var request = require('supertest');

describe('ContactsController', function() {

  const STATUS_SUCCESS = 200;

  describe('#save()', function() {

    function execRequest(param, expectedResult, headers, done) {
      request(sails.hooks.http.app)
      .post('/contact/create')
      .send(param)
      .expect('Content-Type', new RegExp(headers.contentType))
      .expect(headers.status)
      .expect(expectedResult, done);
    }

    describe('with valid params', function() {
      it('should return a success message after contact creation', function (done) {
        var validParam = { name: 'test', number: '123' },
          expectedResult = 'Found. Redirecting to /contact';
        execRequest(validParam, expectedResult, {contentType: 'text', status: 302}, done);
      });
    });

    describe('with missing params', function() {
      it('should return an error if contact name is missing', function (done) {
        var missingContactName = { name: '', number: '12345' },
          expectedResult = {status: false, message: 'Missing contact name'};
        execRequest(missingContactName, expectedResult, {contentType: 'json', status: 200}, done);
      });

      it('should return an error if contact number is missing', function (done) {
        var missingContactNumber = { name: 'Joe Joey', number: '' },
          expectedResult = {status: false, message: 'Missing contact number'};
        execRequest(missingContactNumber, expectedResult, {contentType: 'json', status: 200}, done);
      });

      it('should return an error if contact name and number are missing', function (done) {
        var missingContact = { name: '', number: '' },
          expectedResult = {status: false, message: 'Missing contact details'};
        execRequest(missingContact, expectedResult, {contentType: 'json', status: 200}, done);
      });
    });

  });

  describe('#update()', function() {

    function execRequest(param, expectedResult, done) {
      request(sails.hooks.http.app)
        .put('/contact/1')
        .send(param)
        .expect('Content-Type', /text/)
        .expect(STATUS_SUCCESS)
        .expect(expectedResult, done);
    }

    describe('with valid params', function() {
      it('should return a success message after contact update', function (done) {
        var validParam = { contact_name: 'test', contact_num: '123' },
          expectedResult = 'Contact updated!';
        execRequest(validParam, expectedResult, done);
      });
    });

    describe('with missing params', function() {
      it('should return an error if contact name is missing', function (done) {
        var missingContactName = { contact_name: '', contact_num: '12345' },
          expectedResult = 'Missing contact name';
        execRequest(missingContactName, expectedResult, done);
      });

      it('should return an error if contact number is missing', function (done) {
        var missingContactNumber = { contact_name: 'Joe Joey', contact_num: '' },
          expectedResult = 'Missing contact number';
        execRequest(missingContactNumber, expectedResult, done);
      });

      it('should return an error if contact name and number are missing', function (done) {
        var missingContact = { contact_name: '', contact_num: '' },
          expectedResult = 'Missing contact details';
        execRequest(missingContact, expectedResult, done);
      });
    });

  });

  describe('#get()', function() {

    function execRequest(targetUrl, expectedResult, done) {
      request(sails.hooks.http.app)
        .get(targetUrl)
        .expect('Content-Type', /text/)
        .expect(STATUS_SUCCESS)
        .expect(expectedResult, done);
    }

    describe('with valid param', function() {
      it('should return a success message if ALL contact has been retrieved', function (done) {
        expectedResult = 'All contacts retrieved!';
        execRequest('/contact', expectedResult, done);
      });

      it('should return a success message if ONE contact has been retrieved', function (done) {
        expectedResult = 'One contact retrieved!';
        execRequest('/contact/1', expectedResult, done);
      });
    });

  });

  describe('#destroy()', function() {

    function execRequest(expectedResult, done) {
      request(sails.hooks.http.app)
        .delete('/contact/1')
        .expect('Content-Type', /text/)
        .expect(STATUS_SUCCESS)
        .expect(expectedResult, done);
    }

    describe('with valid param', function() {
      it('should return a success message after contact deletion', function (done) {
        expectedResult = 'Contact deleted!';
        execRequest(expectedResult, done);
      });
    });

  });

});