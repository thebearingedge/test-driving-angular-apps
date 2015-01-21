;(function () {
  'use strict';

  angular
    .module('nationalParks')
    .factory('parkFactory', parkFactory);

  parkFactory.$inject = ['$q', '$http'];

  function parkFactory($q, $http) {

    var factory = {
      create: create,
      getList: getList,
      getOne: getOne,
      update: update,
      save: save
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

    function getList() {
      var url = '/api/parks';
      return $q(function (resolve) {
        return $http.get(url)
          .success(function (parkList) {
            resolve(parkList);
          });
      });
    }

    function getOne(id) {
      var url = '/api/parks/' + id;
      return $q(function (resolve) {
        return $http.get(url)
          .success(function (parkDetails) {
            resolve(parkDetails);
          });
      });
    }

    function update(parkUpdates) {
      var url = '/api/parks/' + parkUpdates.id;
      return $q(function (resolve) {
        return $http.put(url, parkUpdates)
          .success(function (updatedPark) {
            resolve(updatedPark);
          });
      });
    }

    function save(parkDetails) {
      return parkDetails.id ? factory.update(parkDetails) : factory.create(parkDetails);
    }

  }

}());