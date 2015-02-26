;(function () {
  'use strict';

  angular
    .module('exampleApp')
    .service('codeBranchService', codeBranchService);

  codeBranchService.$inject = [];

  function codeBranchService() {

    // jshint validthis: true
    this.reply = reply;

    function reply(input) {
      if (input === 'hello') {
        return 'hi there!';
      }
      return 'say again?';
    }

  }

}());