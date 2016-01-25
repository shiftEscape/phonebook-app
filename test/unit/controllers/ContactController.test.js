var request = require('supertest');

describe('ContactsController', function() {

  const STATUS_SUCCESS = 200;


  describe('#save()', function() {

    function execRequestSave(param, expectedResult, headers, done) {
      request(sails.hooks.http.app)
        .post(headers.url)
        .send(param)
        .expect('Content-Type', new RegExp(headers.contentType))
        .expect(headers.status)
        .expect(expectedResult, done);
    }

    describe('with valid params', function() {
      it('should return a success message after contact creation', function (done) {
        var validParam = { name: 'test', number: '123' },
          expectedResult = 'Found. Redirecting to /contact';
        execRequestSave(validParam, expectedResult, {url: '/contact/create', contentType: 'text', status: 302}, done);
      });
    });

    describe('with missing params', function() {
      it('should return an error if contact name is missing', function (done) {
        var missingContactName = { name: '', number: '12345' },
          expectedResult = {status: false, message: 'Missing contact name'};
        execRequestSave(missingContactName, expectedResult, {url: '/contact/create', contentType: 'json', status: 200}, done);
      });

      it('should return an error if contact number is missing', function (done) {
        var missingContactNumber = { name: 'Joe Joey', number: '' },
          expectedResult = {status: false, message: 'Missing contact number'};
        execRequestSave(missingContactNumber, expectedResult, {url: '/contact/create', contentType: 'json', status: 200}, done);
      });

      it('should return an error if contact name and number are missing', function (done) {
        var missingContact = { name: '', number: '' },
          expectedResult = {status: false, message: 'Missing contact details'};
        execRequestSave(missingContact, expectedResult, {url: '/contact/create', contentType: 'json', status: 200}, done);
      });
    });

  });

  describe('#update()', function() {

    function execRequestUpdate(param, expectedResult, headers, done) {
      request(sails.hooks.http.app)
        .put(headers.url)
        .send(param)
        .expect('Content-Type', new RegExp(headers.contentType))
        .expect(headers.status)
        .expect(expectedResult, done);
    }

    describe('with valid params', function() {
      it('should return a success message after contact update', function (done) {
        var validParam = { name: 'test', number: '123' },
          expectedResult = 'Found. Redirecting to /contact/show/1';
        execRequestUpdate(validParam, expectedResult, {url: '/contact/update/1', contentType: 'text', status: 302}, done);
      });
    });

    describe('with missing params', function() {
      it('should return an error if contact name is missing', function (done) {
        var missingContactName = { name: '', number: '12345' },
          expectedResult = {status: false, message: 'Missing contact name'};;
        execRequestUpdate(missingContactName, expectedResult, {url: '/contact/update/1', contentType: 'json', status: 200}, done);
      });

      it('should return an error if contact number is missing', function (done) {
        var missingContactNumber = { name: 'Joe Joey', number: '' },
          expectedResult = {status: false, message: 'Missing contact number'};
        execRequestUpdate(missingContactNumber, expectedResult, {url: '/contact/update/1', contentType: 'json', status: 200}, done);
      });

      it('should return an error if contact name and number are missing', function (done) {
        var missingContact = { name: '', number: '' },
          expectedResult = {status: false, message: 'Missing contact details'};
        execRequestUpdate(missingContact, expectedResult, {url: '/contact/update/1', contentType: 'json', status: 200}, done);
      });
    });

  });

  describe('#get()', function() {

    function execRequest(targetUrl, done) {
      request(sails.hooks.http.app)
        .get(targetUrl)
        .expect('Content-Type', /text/)
        .expect(STATUS_SUCCESS, done)
    }

    describe('with valid param', function() {
      it('should render the get all contacts page', function (done) {
        execRequest('/contact', done);
      });

      it('should render the edit page containing the user queried', function (done) {
        execRequest('/contact/1', done);
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