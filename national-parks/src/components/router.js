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
        templateUrl: '/templates/list-view.html',
        controller: 'ParkListController',
        controllerAs: 'list',
        resolve: {
          parkList: resolveParkList
        }
      })
      .when('/new-park', {
        templateUrl: '/templates/edit-view.html',
        controller: 'ParkFormController',
        resolve: {
          parkDetails: function () { return {}; }
        }
      })
      .when('/parks/:id/details', {
        templateUrl: '/templates/details-view.html',
        controller: 'ParkDetailsController',
        controllerAs: 'view',
        resolve: {
          parkDetails: resolveParkDetails
        }
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

      var id = $route.current.params.id;
      return parkFactory.getOne(id);

    }

    resolveParkList.$inject = ['parkFactory'];

    function resolveParkList(parkFactory) {

      return parkFactory.getList();

    }

  }

}());