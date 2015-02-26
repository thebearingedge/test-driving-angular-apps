;(function () {
  'use strict';

  angular
    .module('exampleApp')
    .config(routerConfig);

  routerConfig.$inject = ['$routeProvider'];

  function routerConfig($routeProvider) {

    $routeProvider
      .when('/stock-items/:id', {
        templateUrl: '/templates/stock-item.html',
        controller: 'StockItemController',
        resolve: {
          stockItem: resolveStockItem
        }
      });

    resolveStockItem.$inject = ['$route', 'stockItemService'];

    function resolveStockItem($route, stockItemService) {
      var id = $route.current.params.id;
      return stockItemService.getOne(id);
    }

  }

}());