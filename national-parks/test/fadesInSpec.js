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
    img = $compile('<img fades-in>')($scope);
  });

  it('should start with class "fades" and without class "in"', function () {

    expect(img.attr('class')).to.include('fades');
    expect(img.attr('class')).not.to.include(' in');

  });

  it('should add class "in" on "load" event', function () {

    img.triggerHandler('load');

    expect(img.attr('class')).to.include('fades in');

  });

});