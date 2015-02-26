'use strict';

describe('Code branching', function () {

  var codeBranchService;

  beforeEach(function () {

    module('exampleApp');

    inject(function (_codeBranchService_) {
      codeBranchService = _codeBranchService_;
    });

  });


  it('should return a greeting');

  it('should ask for clarification');

});