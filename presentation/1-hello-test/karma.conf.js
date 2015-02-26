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
      'src/**/*.js',
      'test/**/*Spec.js'
    ],

    exclude: [
    ],

    preprocessors: {
    },

    reporters: ['mocha'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Chrome'],

    singleRun: false

  });

};