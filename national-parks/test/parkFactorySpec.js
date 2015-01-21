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

      var parkResponse = parkFactory.create(newPark);

      $httpBackend.flush();

      expect(parkResponse).to.eventually.deep.equal(savedPark);

    });

  });

  describe('#getList', function () {

    it('should GET the list of parks', function () {

      $httpBackend.expectGET('/api/parks')
        .respond(200, parkList);

      var response = parkFactory.getList();

      $httpBackend.flush();

      expect(response).to.eventually.deep.equal(parkList);

    });

  });

  describe('#getOne', function () {

    it('should GET one park by ID', function () {

      $httpBackend.expectGET('/api/parks/4')
        .respond(200, savedPark);

      var response = parkFactory.getOne(4);

      $httpBackend.flush();

      expect(response).to.eventually.deep.equal(savedPark);

    });

  });

  describe('#update', function () {

    it('should PUT park updates by ID', function () {

      $httpBackend.expectPUT('/api/parks/3', parkUpdates)
        .respond(200, updatedPark);

      var response = parkFactory.update(parkUpdates);

      $httpBackend.flush();

      expect(response).to.eventually.deep.equal(updatedPark);

    });

  });

  describe('#save', function () {

    beforeEach(function () {
      sinon.stub(parkFactory, 'update');
      sinon.stub(parkFactory, 'create');
    });

    it('should call #update if the details contain an ID', function () {

      parkFactory.save(parkUpdates);

      expect(parkFactory.update).to.have.been.calledWith(parkUpdates);
      expect(parkFactory.create).not.to.have.been.called;

    });

    it('should call #create if the details do not contain an ID', function () {

      parkFactory.save(newPark);

      expect(parkFactory.create).to.have.been.calledWith(newPark);
      expect(parkFactory.update).not.to.have.been.called;

    });

  });

});