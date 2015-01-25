'use strict';

describe('ParkListController', function() {

  var listController, parkList;

  beforeEach(function () {

    parkList = [
      { id: 1, name: 'Arches' },
      { id: 2, name: 'Crater Lake' }
    ];

    module('nationalParks');

    inject(function ($controller) {

      listController = $controller('ParkListController', {
        parkList: parkList
      });

    });

  });

  describe('Initial state', function () {

    it('should imediately publish parkList on the view model', function () {

      expect(listController.parkList).to.deep.equal(parkList);

    });

  });

});