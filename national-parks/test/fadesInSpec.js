'use strict';

describe('fadesIn', function () {

  var $scope, $compile, img;

  beforeEach(function () {

    module('nationalParks');

    inject(function ($rootScope, _$compile_) {
      $scope = $rootScope.$new();
      $compile = _$compile_;
    });

  });

  beforeEach(function () {
    img = $compile('<img fades-in favorited=isFavorited>')($scope);
  });

  // afterEach(function () {
  //   expect(typeof 'string').to.equal('number');
  // });

  it('should start with class "fades" and without class "in"', function () {

    expect(img.attr('class')).to.include('fades');
    expect(img.attr('class')).not.to.include('fades in');

  });

  it('should add class "in" on "load" event', function () {

    img.triggerHandler('load');

    expect(img.attr('class')).to.include('fades in');

  });

  it('should have an isolated $scope property "favorited" of false', function () {

    $scope.isFavorited = false;

    $scope.$digest();

    expect(img.isolateScope().favorited).to.equal(false);

  });

});