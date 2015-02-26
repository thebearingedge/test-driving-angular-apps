'use strict';

module.exports = function(config) {

  config.set({

    basePath: '',

    frameworks: [
      'mocha',
      'chai',
      'chai-as-promised',
      'sinon',
      'sinon-chai'
    ],

    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'src/**/*.js',
      'test/**/*Spec.js'
    ],

    exclude: [
    ],

    preprocessors: {
      'src/**/*.js': ['coverage']
    },

    reporters: ['mocha', 'coverage'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Chrome'],

    singleRun: false

  });

};