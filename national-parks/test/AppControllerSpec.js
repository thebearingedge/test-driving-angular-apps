describe('AppController', function () {
  'use strict';

  var appController, appTitle;

  beforeEach(function () {

    module('nationalParks');

    inject(function ($controller, _appTitle_) {

      appController = $controller('AppController');
      appTitle = _appTitle_;

    });

  });

  it('should contain a welcome message', function () {

    expect(appController.message).to.equal('Welcome to ');

  });

  it('should build a greeting from appTitle and message', function () {

    var message = appController.message;
    var title = appTitle;

    expect(appController.greeting).to.equal(message + title);

  });

});