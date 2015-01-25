;(function () {
  'use strict';

  angular
    .module('nationalParks')
    .directive('fadesIn', fadesIn);

  fadesIn.$inject = [];

  function fadesIn() {

    var ddo = {
      restrict: 'A',
      link: link
    };

    return ddo;

    function link(scope, elem, attrs) {

      elem.addClass('fades');

      elem.on('load', function () {
        elem.addClass('in');
      });

    }

  }

}());