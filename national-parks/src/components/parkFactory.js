;(function () {
  'use strict';

  angular
    .module('nationalParks')
    .factory('parkFactory', parkFactory);

  parkFactory.$inject = ['$q', '$http'];

  function parkFactory($q, $http) {

    var factory = {
      create: create
    };

    return factory;

    function create(newPark) {
      var url = '/api/parks';
      return $q(function (resolve) {
        return $http.post(url, newPark)
          .success(function (savedPark) {
            resolve(savedPark);
          });
      });
    }

  }

}());