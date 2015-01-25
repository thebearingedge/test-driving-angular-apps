;(function () {
  'use strict';

  angular
    .module('nationalParks')
    .controller('ParkFormController', ParkFormController);

  ParkFormController.$inject = ['parkDetails', 'parkFactory', '$location'];

  function ParkFormController(parkDetails, parkFactory, $location) {

    var vm = this;

    vm.savePark = savePark;
    vm.parkDetails = undefined;

    initialize();

    function initialize() {
      vm.parkDetails = parkDetails;
    }

    function savePark(parkDetails) {
      return parkFactory.save(parkDetails)
        .then(function (saved) {
          var route = '/parks/' + saved.id + '/details';
          return $location.path(route);
        });
    }

  }

}());