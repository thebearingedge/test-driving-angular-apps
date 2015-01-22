;(function () {
  'use strict';

  angular
    .module('nationalParks')
    .controller('ParkFormController', ParkFormController);

  ParkFormController.$inject = ['parkFactory', '$location'];

  function ParkFormController(parkFactory, $location) {

    var vm = this;

    vm.savePark = savePark;

    function savePark(parkDetails) {
      return parkFactory.save(parkDetails)
        .then(function (saved) {
          var route = '/parks/' + saved.id + '/details';
          return $location.path(route);
        });
    }

  }

}());