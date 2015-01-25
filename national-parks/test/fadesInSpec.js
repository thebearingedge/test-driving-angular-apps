'use strict';

describe('imageFader', function () {

  var $scope, $compile, img;

  beforeEach(function () {

    module('nationalParks');

    inject(function ($rootScope, _$compile_) {
      $scope = $rootScope.$new();
      $compile = _$compile_;
    });

  });

  beforeEach(function () {
    img = $compile('<img fades-in ng-src="">')($scope);
  });

  it('should start without class "in"', function () {

    expect(img.attr('class')).to.include('fades');
    expect(img.attr('class')).not.to.include(' in');

  });

  it('should add class "in"', function () {

    img.triggerHandler('load');

    expect(img.attr('class')).to.include('fades in');

  });

});