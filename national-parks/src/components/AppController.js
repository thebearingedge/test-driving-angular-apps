;(function () {
  'use strict';

  angular
    .module('nationalParks')
    .controller('AppController', AppController);

  AppController.$inject = ['appTitle'];

  function AppController(appTitle) {

    var vm = this;

    vm.message = 'Welcome to ';
    vm.greeting = undefined;

    initialize();

    function initialize() {
      vm.greeting = vm.message + appTitle;
    }

  }

}());