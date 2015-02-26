;(function () {
  'use strict';

  angular
    .module('exampleApp')
    .directive('favorited', favorited);

  favorited.$inject = [];

  function favorited() {

    var directive = {
      restrict: 'A',
      scope: {
        favorited: '='
      },
      link: link
    };

    return directive;

    /* jshint unused:false */
    function link(scope, element, attributes) {

      element.on('click', function ($event) {
        $event.preventDefault();
        scope.favorited = !scope.favorited;
      });

      scope.$watch('favorited', function (newVal) {
        if (newVal) {
          return element.addClass('is-favorited');
        }
        else {
          element.removeClass('is-favorited');
        }
      });

    }

  }

}());