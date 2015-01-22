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
      .when('/new-park', {
        templateUrl: 'templates/edit-view.html'
      })
      .when('/parks/:id/details', {
        templateUrl: '/templates/details-view.html'
      })
      .when('/parks/:id/edit', {
        templateUrl: '/templates/edit-view.html',
        controller: 'ParkFormController',
        resolve: {
          parkDetails: resolveParkDetails
        }
      })
      .otherwise('/');


    resolveParkDetails.$inject = ['parkFactory', '$route'];

    function resolveParkDetails(parkFactory, $route) {

      var id = parseInt($route.current.params.id, 10);
      return parkFactory.findById(id);

    }

  }

}());