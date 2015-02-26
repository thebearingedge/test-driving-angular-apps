;(function () {
  'use strict';

  angular
    .module('exampleApp')
    .controller('StockItemController', StockItemController);

  StockItemController.$inject = ['stockItem'];

  function StockItemController(stockItem) {

    var vm = this;

  }

}());