'use strict';

describe('router', function () {

  var $location, $route, $rootScope, $httpBackend, mockParkFactory, parkFactory, parkDetails;

  beforeEach(function () {

    parkDetails = { id: 1, name: 'Arches' };

    mockParkFactory = {};

    module('nationalParks', function ($provide) {
      $provide.value('parkFactory', mockParkFactory);
    });

    inject(function ($q) {
      mockParkFactory.findById = sinon.spy(function (id) {
        return $q(function (resolve) {
          resolve(parkDetails);
        });
      });
    });

  });

  beforeEach(function () {

    inject(function (_$location_, _$route_, _$rootScope_, _$httpBackend_, _parkFactory_) {
      $location = _$location_;
      $route = _$route_;
      $rootScope = _$rootScope_;
      $httpBackend = _$httpBackend_;
      parkFactory = _parkFactory_;
    });

  });

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
  });

  describe('/parks/:id/edit', function () {

    var route = '/parks/1/edit';

    beforeEach(function () {
      $httpBackend.expectGET('/templates/edit-view.html')
        .respond(200);
    });

    it('should load the edit view template', function () {

      $location.path(route);

    });

    it('should instantiate ParkFormController', function () {

      $location.path(route);

      $rootScope.$digest();

      expect($route.current.controller).to.equal('ParkFormController');

    });

    it('should resolve parkDetails', function () {

      $location.path(route);

      $rootScope.$digest();

      expect(parkFactory.findById).to.have.been.calledWith(1);

    });

    it('should pass parkDetails to ParkFormController');

  });

});