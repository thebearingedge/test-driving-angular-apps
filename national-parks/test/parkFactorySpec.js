describe('parkFactory', function () {
  'use strict';

  var parkFactory, $httpBackend, newPark, savedPark, parkUpdates, updatedPark, parkList;

  beforeEach(function () {

    newPark = { name: 'Arches', state: 'Utah' };
    savedPark = { id: 4, name: 'Arches', state: 'Utah' };
    parkList = [
      { id: 1, name: 'Glacier' },
      { id: 2, name: 'Crater Lake' }
    ];
    parkUpdates = { id: 3, description: 'Sweet.' };
    updatedPark = { id: 3, name: 'Joshua Tree', description: 'Sweet.' };

    module('nationalParks');

    inject(function (_parkFactory_, _$httpBackend_) {
      parkFactory = _parkFactory_;
      $httpBackend = _$httpBackend_;
    });

  });

  afterEach(function () {

      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();

  });

  describe('#create', function () {

    it('should POST a new park', function () {

      $httpBackend.expectPOST('/api/parks', newPark)
        .respond(200, savedPark);

      var createdPark = parkFactory.create(newPark);

      $httpBackend.flush();

      expect(createdPark).to.eventually.deep.equal(savedPark);


    });

  });

});