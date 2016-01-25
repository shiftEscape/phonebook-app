var request = require('supertest');

describe('ContactController', function() {

  const STATUS_SUCCESS = 200, STATUS_REDIRECT = 302;

  var factoryData = {
    name: 'Joe Johnson',
    number: '+63917-5902876',
    updatedName: 'Nick Johnson III',
    updatedNumber: '+63912-1902666',
    createdID: null
  };

  describe('#save()', function() {

    function execRequestSave(param, expectedResult, headers, done) {
      request(sails.hooks.http.app)
        .post(headers.url)
        .send(param)
        .expect('Content-Type', new RegExp(headers.contentType))
        .expect('Location', headers.location)
        .expect(headers.status)
        .expect(expectedResult, done);
    }

    describe('with valid params', function() {
      it('should redirect to /contact page after successful creation of contact', function (done) {
        var validParam = { name: factoryData.name, number: factoryData.number },
          expectedResult = 'Found. Redirecting to /contact/?create=true',
          headerParams = {url: '/contact/create', location: '/contact/?create=true', contentType: 'text', status: STATUS_REDIRECT};
        execRequestSave(validParam, expectedResult, headerParams, done);
      });
    });

    describe('with missing params', function() {
      it('should return an error if contact name is missing', function (done) {
        var missingContactName = { name: '', number: factoryData.number },
          expectedResult = 'Found. Redirecting to /contact/?valid=false',
          headerParams = {url: '/contact/create', location: '/contact/?valid=false', contentType: 'text', status: STATUS_REDIRECT};
        execRequestSave(missingContactName, expectedResult, headerParams, done);
      });

      it('should return an error if contact number is missing', function (done) {
        var missingContactNumber = { name: factoryData.name, number: '' },
          expectedResult = 'Found. Redirecting to /contact/?valid=false',
          headerParams = {url: '/contact/create', location: '/contact/?valid=false', contentType: 'text', status: STATUS_REDIRECT};
        execRequestSave(missingContactNumber, expectedResult, headerParams, done);
      });

      it('should return an error if contact name and number are missing', function (done) {
        var missingContact = { name: '', number: '' },
          expectedResult = 'Found. Redirecting to /contact/?valid=false',
          headerParams = {url: '/contact/create', location: '/contact/?valid=false', contentType: 'text', status: STATUS_REDIRECT};
        execRequestSave(missingContact, expectedResult, headerParams, done);
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
        var validParam = { name: factoryData.updatedName, number: factoryData.updatedNumber },
          expectedResult = 'Found. Redirecting to /contact/show/1';
        execRequestUpdate(validParam, expectedResult, {url: '/contact/update/1', contentType: 'text', status: STATUS_REDIRECT}, done);
      });
    });

    describe('with missing params', function() {
      it('should return an error if contact name is missing', function (done) {
        var missingContactName = { name: '', number: factoryData.number },
          expectedResult = {status: false, message: 'Missing contact name'};
        execRequestUpdate(missingContactName, expectedResult, {url: '/contact/update/1', contentType: 'json', status: STATUS_SUCCESS}, done);
      });

      it('should return an error if contact number is missing', function (done) {
        var missingContactNumber = { name: factoryData.name, number: '' },
          expectedResult = {status: false, message: 'Missing contact number'};
        execRequestUpdate(missingContactNumber, expectedResult, {url: '/contact/update/1', contentType: 'json', status: STATUS_SUCCESS}, done);
      });

      it('should return an error if contact name and number are missing', function (done) {
        var missingContact = { name: '', number: '' },
          expectedResult = {status: false, message: 'Missing contact details'};
        execRequestUpdate(missingContact, expectedResult, {url: '/contact/update/1', contentType: 'json', status: STATUS_SUCCESS}, done);
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
        .delete('/contact/3')
        .expect('Content-Type', /text/)
        .expect(STATUS_REDIRECT)
        .expect(expectedResult, done);
    }

    describe('with valid param', function() {
      it('should return a success message after contact deletion', function (done) {
        expectedResult = 'Found. Redirecting to /contact';
        execRequest(expectedResult, done);
      });
    });

  });

});