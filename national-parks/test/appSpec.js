describe('National Parks', function () {
'use strict';

  beforeEach(function () {

    module('nationalParks');

  });

  describe('app title', function () {

    it('should be "National Parks"', inject(function (appTitle) {

      expect(appTitle).to.equal('National Parks');

    }));

  });

});