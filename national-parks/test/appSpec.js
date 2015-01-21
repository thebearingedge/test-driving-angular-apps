describe('National Parks', function () {
'use strict';

  beforeEach(function () {

    // use module to build the $injector service
    module('nationalParks');

  });

  describe('app title', function () {

    // karma skips empty tests
    it('should be "National Parks"', inject(function (appTitle) {

      expect(appTitle).to.equal('National Parks');

    }));

  });

});