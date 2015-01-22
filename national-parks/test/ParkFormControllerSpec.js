describe('ParkFormController', function () {
  'use strict';

  var formController, mockParkFactory, parkFactory, parkDetails,
      $location, $rootScope;

  beforeEach(function () {

    parkDetails = { name: 'Mount Rainier', description: 'Woah' };

    mockParkFactory = {};

    module('nationalParks', function ($provide) {
      $provide.value('parkFactory', mockParkFactory);
    });

    inject(function ($q) {
      mockParkFactory.save = sinon.spy(function (details) {
        return $q(function (resolve) {
          details.id = 8;
          resolve(details);
        });
      });
    });

  });

  beforeEach(function () {

    inject(function ($controller, _parkFactory_, _$location_, _$rootScope_) {
      formController = $controller('ParkFormController');
      parkFactory = _parkFactory_;
      $location = _$location_;
      $rootScope = _$rootScope_;

      sinon.spy($location, 'path');
    });

  });

  describe('#savePark', function () {

    it('should delegate saving to parkFactory#save', function () {

      formController.savePark(parkDetails);

      expect(parkFactory.save).to.have.been.calledWith(parkDetails);

    });

    it('should redirect to the saved park\'s detail view', function () {

      formController.savePark(parkDetails);

      $rootScope.$digest();

      expect($location.path).to.have.been.calledWith('/parks/8/details');

    });

  });

});