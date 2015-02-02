'use strict';

describe('parkListItem', function () {

  var $scope, $compile, listItem, park;

  beforeEach(function () {

    park = { id: 1, name: 'Arches', location: 'Utah', imageUrl: '' };

    module('nationalParks');

    inject(function ($rootScope, _$compile_) {
      $scope = $rootScope.$new();
      $compile = _$compile_;
    });

  });

  beforeEach(function () {

    $scope.park = park;

    listItem = $compile('<park-list-item details="park">')($scope);

    $scope.$digest();

  });

  it('should isolate park details on its local scope', function () {

    expect(listItem.isolateScope().details).to.deep.equal(park);

  });

  it('should include an image tag', function () {

    var image = listItem.find('img');

    expect(image.attr('src')).to.equal(park.imageUrl);

  });

  it('should include the park name in the header', function () {

    var header = listItem.find('h2');

    expect(header.text()).to.include(park.name);

  });

  it('should link to the park details page', function () {

    var url = '#/parks/1/details';

    var anchor = listItem.find('a');

    expect(anchor.attr('href')).to.equal(url);

  });


});