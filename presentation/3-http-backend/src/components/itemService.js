;(function () {
  'use strict';

  angular
    .module('exampleApp')
    .factory('stockItemService', stockItemService);

  stockItemService.$inject = ['$http', '$q'];

  function stockItemService($http, $q) {

    var url = '/api/stock-items';

    var factory = {
      getList: getList
    };

    return factory;

    function getList() {

      return $http.get(url)
        .success(function (stockItems) {
          return $q.when(stockItems);
        });

    }

  }

}());