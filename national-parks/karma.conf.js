// Karma configuration
// Generated on Tue Jan 20 2015 19:43:55 GMT-0800 (PST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [
      'mocha',
      // in addition to mocha, we'll be using these libraries
      'chai',
      'chai-as-promised',
      'sinon',
      'sinon-chai'
    ],


    // list of files / patterns to load in the browser
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'src/**/*.js',
      'test/**/*Spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    preprocessors: {
      // add our source directory to preprocessors
      'src/**/*.js': ['coverage']
    },

    // add 'coverage' to our reporters
    reporters: ['mocha', 'coverage'],

    // configure the coverage reporter to output to 'coverage/'
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
