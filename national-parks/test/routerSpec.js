'use strict';

describe('router', function () {

  var $location, $route, $rootScope, $httpBackend;

  beforeEach(function () {

    module('nationalParks');

    inject(function (_$location_, _$route_, _$rootScope_, _$httpBackend_) {

      $location = _$location_;
      $route = _$route_;
      $rootScope = _$rootScope_;
      $httpBackend = _$httpBackend_;

    });

  });

  afterEach(function () {

    $httpBackend.verifyNoOutstandingExpectation();

  });

  it('should default to "/" and load the home-view template', function () {

    $httpBackend.expectGET('/templates/home-view.html')
      .respond(200);

    $location.path('/asdf-jibberish-asdf');
    $rootScope.$digest();

    expect($location.path()).to.equal('/');

  });

  describe('/parks', function () {

    it('should load the list view template', function () {

      $httpBackend.expectGET('/templates/list-view.html')
        .respond(200);

      $location.path('/parks');

    });

  });

});