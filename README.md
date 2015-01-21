Building A Simple AngularJS App, Test-First
----

This is a work-in-progress guide to building a "National Parks" CRUD app in AngularJS 1.x with an emphasis on [BDD](http://en.wikipedia.org/wiki/Behavior-driven_development).

---

### Tools

The following tools are used throughout this guide. [Node.js](http://nodejs.org/download/) and NPM must be installed before you begin. As of version 0.6.3, Node.js comes bundled with NPM.

- [Karma](http://karma-runner.github.io/0.12/index.html) Test Runner
  - Karma Plugins
    - [karma-mocha](https://github.com/karma-runner/karma-mocha)
    - [karma-mocha-reporter](https://www.npmjs.com/package/karma-mocha-reporter)
    - [karma-chai-plugins](https://github.com/princed/karma-chai-plugins)
    - [karma-sinon](https://github.com/yanoosh/karma-sinon)
    - [karma-coverage](http://karma-runner.github.io/0.8/config/coverage.html)
    - [karma-chrome-launcher](https://github.com/karma-runner/karma-chrome-launcher)
- [Mocha](http://mochajs.org/) Test Framework
- [Chai](http://chaijs.com/) Assertion Library
  + [Chai as Promised](http://chaijs.com/plugins/chai-as-promised) Promise Assertions
- [Sinon](http://sinonjs.org/) Spies, Stubs & Mocks Library
- [Bower](http://bower.io/) Front-End Package Manager
- [Angular Mocks](https://docs.angularjs.org/guide/unit-testing) Test Helpers
- [AngularJS]() Framework

---

### Setting up the environment

##### Dependencies

To begin, install the karma command line interface globally.

```bash
~ $ [sudo] npm install -g karma-cli
```

Make a `national-parks`  directory and change into it.
To maintain npm dependencies for the project, run `npm init` to set up a `package.json` file.

The following command will install all of our local `devDependencies` and add them to our `package.json`.

```bash
~/national-parks $ npm install -D karma  \
karma-mocha karma-mocha-reporter \
karma-chai karma-chai-plugins \
karma-sinon karma-coverage karma-chrome-launcher
```

We are going to download AngularJS and Angular Mocks via [Bower](http://bower.io/).

```bash
~ $ [sudo] npm install -g bower
```

Run `bower init` from within `national-parks/` to create a `bower.json` file.
Then to download `angular.js` and `angular-mocks.js` and save them as project dependencies, run:

```bash
~/national-parks $ bower install -S angular angular-mocks
```

##### Project Structure

Karma needs to know where our module's source and test files live. For this guide, I will put source files in `./src` and unit tests in `./test`.

```
national-parks/
| bower.json
| package.json
├ bower_components/
├ node_modules/
├ src/
└ test/
```

##### Karma Configuration

While installed globally, karma needs a local configuration before use. Because we installed `karma-cli` globally, we can run `karma init` within our `national-parks/` directory to generate a `karma.conf.js` file. Changes will need to be made to our resulting configuration:

```javascript
// national-parks/karma.conf.js

module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: [
      'mocha',
      // in addition to mocha, we'll be using these libraries
      'chai',
      'chai-as-promised',
      'sinon',
      'sinon-chai'
    ],

    files: [
      /* 
      * in order to test angular modules, we need karma to load 
      * angular and angular-mocks ahead of our source code and tests.
      */
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'src/**/*.js',
      'test/**/*Spec.js'
    ],

    exclude: [
    ],

    preprocessors: {
    },

    // this defaults to 'progess', but I prefer mocha's reporter output
    reporters: ['mocha'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    // automation rules.
    // autoWatch lets us focus on coding.
    autoWatch: true,

    // running 'karma start' will launch an instance of Chrome
    // to run our tests
    browsers: ['Chrome'],

    // We want to avoid browsers launching and quitting between test exectution
    singleRun: false
  });
};
```

---

### Mocha, Chai and the First Test

Our testing framework for this guide is [Mocha](http://mochajs.org/). Mocha makes it easy to write expressive test suites using nestable `describe` blocks and unit tests that begin with `it`. [Chai](http://chaijs.com/) will be our assertion library and we'll use its `expect` function within our tests. Let's write a `fakeSpec.js` mocha test in our `test/` directory to confirm that our tests fail when they should!

```javascript
// national-parks/test/fakeSpec.js

// name of the system under test
describe('sanity check', function () {

  // specified behavior
  it('should defy all logic', function () {

    // assertion that specification is met
    expect(2 + 2).to.equal(5);
  });

});
```

Run `karma start` from within the root of `national-parks/` to launch Karma. Karma will in turn launch Chrome and `fakeSpec.js` will be executed within the browser. Karma will report the test results on the command line. Additionally, Karma is now watching matched files in our `src/` and `test/` directories for changes. Upon saving changes to a file, our battery of tests will run again automatically!

`~/national-parks $ karma start` outputs:

```bash
Start:
  sanity check
    ✖ should defy all logic

Finished in 0.01 secs / 0.002 secs

SUMMARY:
✔ 0 tests completed
✖ 1 tests failed

FAILED TESTS:
  sanity check
    ✖ should defy all logic
    AssertionError: expected 4 to equal 5
```

Let's revise our test to something more reasonable.

```javascript
describe('sanity check', function () {

  it('should conform to basic reason', function () {

    expect(2 + 2).not.to.equal(5);

  });

});
```

Save changes to `fakeSpec.js` and it should now pass:

```bash
  sanity check
    ✔ should conform to basic reason

Finished in 0.007 secs / 0.001 secs

SUMMARY:
✔ 1 tests completed
```
