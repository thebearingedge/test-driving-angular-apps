;(function () {
  'use strict';

  angular
    .module('nationalParks')
    .directive('parkListItem', parkListItem);

  parkListItem.$inject = [];

  function parkListItem() {

    var ddo = {
      restrict: 'E',
      scope: {
        details: '='
      },
      template: '<h2>' +
                  '<a href="{{ detailsUrl }}">{{ headerText }}</a>' +
                '</h2>' +
                '<img src="" fades-in/>',
      link: link
    };

    return ddo;

    function link(scope, elem, attrs) {

      var image = elem.find('img');

      image.attr('src', scope.details.imageUrl);

      scope.detailsUrl = '#/parks/' + scope.details.id + '/details';

      scope.headerText = scope.details.name + ' - ' + scope.details.location;

    }

  }

}());