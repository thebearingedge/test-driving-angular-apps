;(function () {
  'use strict';

  angular
    .module('nationalParks')
    .controller('ParkDetailsController', ParkDetailsController);

  ParkDetailsController.$inject = ['parkDetails'];

  function ParkDetailsController(parkDetails) {

    var vm = this;

    vm.parkDetails = undefined;

    initialize();

    function initialize() {
      vm.parkDetails = parkDetails;
    }

  }

}());