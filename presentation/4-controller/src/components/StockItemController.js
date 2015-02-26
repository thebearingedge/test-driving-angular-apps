;(function () {
  'use strict';

  angular
    .module('exampleApp')
    .controller('StockItemController', StockItemController);

  StockItemController.$inject = [
    '$location', 'stockItem', 'stockItemService'
  ];

  function StockItemController($location, stockItem, stockItemService) {

    var vm = this;

    // view model
    vm.item = null;

    // view controls
    vm.saveItem = saveItem;

    initialize();

    function initialize() {
      vm.item = stockItem;
    }

    function saveItem() {
      return stockItemService.save(vm.item)
        .then(function () {
          return $location.path('/');
        });
    }

  }

}());