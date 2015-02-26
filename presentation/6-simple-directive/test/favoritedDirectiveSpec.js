'use strict';

describe('Directive example', function () {

  var $scope,
      $compile,
      myElement;

  beforeEach(function () {

    module('exampleApp');

    // inject services
    inject(function ($rootScope, _$compile_) {
      $scope = $rootScope.$new();
      $compile = _$compile_;
    });

  });

  // compile directive
  beforeEach(function () {});

  it('should isolate its "favorited" scope property');

  it('should toggle its favorited scope property on click');

  it('should toggle its "is-favorited" class');

});