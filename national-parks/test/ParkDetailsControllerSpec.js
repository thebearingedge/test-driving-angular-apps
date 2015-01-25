'use strict';

describe('ParkDetailsController', function () {

  var detailsController, parkDetails;

  beforeEach(function () {

    parkDetails = { id: 1, name: 'Arches' };

    module('nationalParks');

    inject(function ($controller) {

      detailsController = $controller('ParkDetailsController', {
        parkDetails: parkDetails
      });

    });

  });

  describe('Initial state', function () {

    it('should immediately publish parkDetails on the view model', function () {

      expect(detailsController.parkDetails).to.deep.equal(parkDetails);

    });

  });


});