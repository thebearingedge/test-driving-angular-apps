;(function () {
  'use strict';

  angular
    .module('nationalParks')
    .controller('ParkListController', ParkListController);

  ParkListController.$inject = ['parkList'];

  function ParkListController(parkList) {

    var vm = this;

    vm.parkList = undefined;

    initialize();

    function initialize() {
      vm.parkList = parkList;
    }

  }

}());