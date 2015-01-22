;(function () {
  'use strict';

  angular
    .module('nationalParks')
    .config(router);

  router.$inject = ['$routeProvider'];

  function router($routeProvider) {

    $routeProvider

      .when('/', {
        templateUrl: '/templates/home-view.html'
      })

      .when('/parks', {
        templateUrl: '/templates/list-view.html'
      })

      .otherwise('/');

  }

}());