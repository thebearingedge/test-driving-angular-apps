'use strict';

describe('router', function () {

  var $rootScope,
      $location,
      $route,
      $httpBackend,
      mockItemService,
      stockItemService;

  beforeEach(function () {

    var myGuitar = { id: 1, type: 'electric' };

    // provide new definition of stockItemService
    module('exampleApp', function ($provide) {
      mockItemService = {};
      $provide.value('stockItemService', mockItemService);
    });

    // build mock data service
    inject(function ($q) {
      mockItemService.getOne = sinon.spy(function () {
        return $q.when(myGuitar);
      });
    });

    // inject and reference services
    inject(function (_$rootScope_, _$location_, _$route_, _$httpBackend_, _stockItemService_) {
      $rootScope = _$rootScope_;
      $location = _$location_;
      $route = _$route_;
      $httpBackend = _$httpBackend_;
      stockItemService = _stockItemService_;
    });

  });

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
  });

  describe('/stock-items/:id', function () {

    // anticipate template GETs & navigation to path
    beforeEach(function () {});

    // check $route controller property
    it('should instantiate "StockItemController"');

    // use $injector service to invoke resolve function
    it('should resolve stock item data');

  });

});