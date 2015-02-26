'use strict';

describe('router', function () {

  var $location, $route, $rootScope, $httpBackend,
      mockParkFactory, parkFactory, parkDetails, parkList;

  beforeEach(function () {

    parkDetails = { id: 1, name: 'Arches' };

    parkList = [
      { id: 1, name: 'Arches' },
      { id: 2, name: 'Crater Lake' }
    ];

    mockParkFactory = {};

    module('nationalParks', function ($provide) {
      $provide.value('parkFactory', mockParkFactory);
    });

    inject(function ($q) {

      mockParkFactory.getOne = sinon.spy(function (id) {
        return $q.when(parkDetails);
      });

      mockParkFactory.getList = sinon.spy(function () {
        return $q.when(parkList);
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

  describe('default route', function () {

    it('should default to "/"', function () {

      $httpBackend.expectGET('/templates/home-view.html')
        .respond(200);

      $location.path('');

      $rootScope.$digest();

      expect($location.path()).to.equal('/');

    });

  });

  describe('/', function () {

    it('should load the home view template', function () {

      $httpBackend.expectGET('/templates/home-view.html')
        .respond(200);

      $location.path('/');

    });

  });

  describe('/parks/:id/edit', function () {

    var url = '/parks/1/edit';

    beforeEach(function () {
      $httpBackend.expectGET('/templates/edit-view.html')
        .respond(200);
    });

    it('should load the edit view template', function () {

      $location.path(url);

    });

    it('should instantiate ParkFormController', function () {

      $location.path(url);

      $rootScope.$digest();

      expect($route.current.controller).to.equal('ParkFormController');

    });

    it('should resolve parkDetails', inject(function ($injector) {

      $location.path(url);

      $rootScope.$digest();

      expect(parkFactory.getOne).to.have.been.calledWith('1');

      expect($injector.invoke($route.current.resolve.parkDetails))
        .to.eventually.deep.equal(parkDetails);

    }));

  });

  describe('/new-park', function () {

    var url = '/new-park';

    beforeEach(function () {
      $httpBackend.expectGET('/templates/edit-view.html')
        .respond(200);
    });

    it('should load the edit view template', function () {

      $location.path(url);

    });

    it('should instantiate ParkFormController', function () {

      $location.path(url);

      $rootScope.$digest();

      expect($route.current.controller).to.equal('ParkFormController');

    });

    it('should resolve empty parkDetails', function () {

      $location.path(url);

      $rootScope.$digest();

      expect($route.current.resolve.parkDetails())
        .to.deep.equal({});

    });

  });

  describe('/parks/:id/details', function () {

    var url = '/parks/1/details';

    beforeEach(function () {
      $httpBackend.expectGET('/templates/details-view.html')
        .respond(200);
    });

    it('should load the details view template', function () {

      $location.path(url);

    });

    it('should instantiate ParkDetailsController', function () {

      $location.path(url);

      $rootScope.$digest();

      expect($route.current.controller).to.equal('ParkDetailsController');

    });

    it('should resolve parkDetails', inject(function ($injector) {

      $location.path(url);

      $rootScope.$digest();

      expect(parkFactory.getOne).to.have.been.calledWith('1');

      expect($injector.invoke($route.current.resolve.parkDetails))
        .to.eventually.deep.equal(parkDetails);

    }));

  });

  describe('/parks', function () {

    var url = '/parks';

    beforeEach(function () {
      $httpBackend.expectGET('/templates/list-view.html')
        .respond(200);
    });

    it('should load the list view template', function () {

      $location.path(url);

    });

    it('should instantiate ParkListController', function () {

      $location.path(url);

      $rootScope.$digest();

      expect($route.current.controller).to.equal('ParkListController');

    });

    it('should resolve parkList', inject(function ($injector) {

      $location.path(url);

      $rootScope.$digest();

      expect(parkFactory.getList).to.have.been.called;

      expect($injector.invoke($route.current.resolve.parkList))
        .to.eventually.deep.equal(parkList);

    }));

  });

});