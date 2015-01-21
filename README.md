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

---

### Angular Mocks and the "National Parks" `constant`

The Angular Mocks library ships with a handful of functions that we'll be using to craft our unit tests.

##### `module`

As the docs state, [`module`](https://docs.angularjs.org/api/ngMock/function/angular.mock.module) builds our app's (or module's) `$injector` service, preparing the module's components for injection. All of our angular-specific tests will rely on referencing the `nationalParks` module, so we can use `module` to build the `$injector` "before each" test. `beforeEach` is a Mocha function that will execute in advance of each following test, allowing us to centralize setup and avoid repetition.

```javascript
// national-parks/test/appSpec.js

describe('National Parks', function () {

  beforeEach(function () {

    // use module to build the $injector service
    module('nationalParks');

  });

  describe('app title', function () {

    // karma skips empty tests
    it('should be "National Parks"');

  });

});
```

After creating and saving the above `appSpec.js`, Karma should report that it has skipped our empty test.

```bash
Start:
  National Parks
    app title
      ✖ should be "National Parks" (skipped)

Finished in 0.005 secs / 0 secs

SUMMARY:
✔ 0 tests completed
ℹ 1 tests skipped
```

##### `inject`

The next Angular Mocks function we'll use is [`inject`](https://docs.angularjs.org/api/ngMock/function/angular.mock.inject). `inject` will actually instantiate the `$injector` service created when we called `module`. It is used to inject references to registered components into our tests. These components include AngularJS services as well as components we've registered on the `nationalParks` module.

As described in `appSpec.js`, we want to test that the app is titled "National Parks". Once `appTitle` is injected into the test, we can make assertions against it.

```javascript
// national-parks/test/appSpec.js

describe('National Parks', function () {

  beforeEach(function () {

    module('nationalParks');

  });

  describe('app title', function () {

    // inject the 'appTitle' component of 'nationalParks'
    it('should be "National Parks"', inject(function (appTitle) {

      expect(appTitle).to.equal('National Parks');

    }));

  });

});
```

Save the above changes, and we receive the following failure report:

```bash
Start:
  National Parks
    app title
      ✖ should be "National Parks"

Finished in 0.015 secs / 0.008 secs

SUMMARY:
✔ 0 tests completed
✖ 1 tests failed

FAILED TESTS:
  National Parks
    app title
      ✖ should be "National Parks"
      Error: [$injector:modulerr] Failed to instantiate module nationalParks due to:
      Error: [$injector:nomod] Module 'nationalParks' is not available! You either misspelled the module name or forgot to load it. If registering a module ensure that you specify the dependencies as the second argument.
```

Of course, we haven't written a single line of `nationalParks` so the module's `$injector` service could not be built. Let's create the module, `app.js` in our `src/` directory and see what happens.

```javascript
// national-parks/src/app.js

;(function () {
  'use strict';

  angular.module('nationalParks', []);

}());
```

Now Karma reports a different error:

```bash
FAILED TESTS:
  National Parks
    app title
      ✖ should be "National Parks"
      Error: [$injector:unpr] Unknown provider: appTitleProvider <- appTitle
```

So although the test still fails, we have made a little progress. Our module's `$injector` was built and instantiated, but could not find the necessary `provider` for `appTitle`. Let's rectify that now by adding a `constant` to `nationalParks`. I will put `appTitle.js` in `src/components/`.

```javascript
// national-parks/src/components/appTitle.js

;(function () {
  'use strict';

  angular
    .module('nationalParks')
    // 'constant' is a $provide method exposed on angular.module
    .constant('appTitle', 'National Parks');

}());
```

Now our test passes!

```bash
Start:
  National Parks
    app title
      ✔ should be "National Parks"

Finished in 0.017 secs / 0.012 secs

SUMMARY:
✔ 1 tests completed
```

---

### Code Coverage

Writing our tests first will go a long way to ensure that A) production code isn't delivered without corresponding tests and B) we have as much coverage as needed to verify that our code works. But we've only written one tiny piece of our app. A complex application will likely have more functionality than any one developer can keep track of. Fortunately, we can enable `karma-coverage` to monitor how thorough our test suite really is.

##### Karma Coverage

To enable test coverage reporting, updates must be made to `karma.conf.js`.

```javascript
// project-directory/karma.conf.js

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
      'bower_components/angularjs/angular.js',
      'bower_components/angularjs/angular-mocks.js',
      'app/scripts/**/*.js',
      'app/test/**/*Spec.js'
    ],

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

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Chrome'],

    singleRun: false
  });
};
```

For these changes to take effect, Karma needs to be stopped and started again.

After Karma has started and run our tests again, you should find that `national-parks/coverage/Chrome/` has been created. We can open the `index.html` in a browser to review coverage reports for all of our code thus far. For now, we are at 100% coverage and we'll try to keep it that way!

---

### An Async Data Service

At the heart of any CRUD app is the data itself. To keep our concerns separated, we'll create an AngularJS `factory` as the source and destination of our app's data. "National Parks" will retrieve and persist its data to a web service via XHR requests. Let's begin by writing a spec for a `parkFactory`, describing its interface and behavior for creating a new park. The `parkFactory.create` method should send a `POST` request to a web service.

```javascript
// national-parks/test/parkFactorySpec.js

describe('parkFactory', function () {

  describe('#create', function () {

    it('should POST a new park');

  });

});
```

##### Resolving References

We'll need to exercise `parkFactory` in each of our tests, but we don't want to have to type out `inject` for every test like we did for `appTitle`. We can do that work in a `beforeEach` block. To get at `parkFactory` from within our tests, we'll use a convenient little hack courtesy of the AngularJS team. It's not hard to use, but they talk about it slightly more in depth in the [docs](https://docs.angularjs.org/api/ngMock/function/angular.mock.inject).

1. Declare a variable outside the scope of `beforeEach`
2. Inject the component, wrapped in \_underscores\_
3. Initialize the aforementioned outer variable to the value of the injected component
4. Profit

```javascript
// national-parks/test/parkFactorySpec.js

describe('parkFactory', function () {

  // declare a variable outside the scope of 'beforeEach'
  var parkFactory;

  beforeEach(function () {

    module('nationalParks');

    // inject the component, wrapped in _underscores_
    inject(function (_parkFactory_) {
      // initialize the outer variable to the value of the injected component
      parkFactory = _parkFactory_;
    });

  });

  describe('#create', function () {

    // exercise parkFactory
    it('should POST a new park');

  });

});
```

##### Mocking A Web Service API: `$httpBackend`

Part of keeping our tests manageable includes isolating our System Under Test as much as possible. Our current System Under Test is `parkFactory`. To keep it isolated, we want to avoid any real XHR requests from being sent by the browser. There are a few reasons for this, here are some of them:

- I/O, network or otherwise, is *way* slower than in-memory code execution
- Anomalies in network integrity could make our tests unreliable
- Is the server API even written yet?

Enter `$httpBackend`. Or rather, the mock `$httpBackend`. The real `$httpBackend` service is actually the part of the AngularJS framework that sits between `$http` or `$resource` and the browser's `XMLHttpRequest` object. As a result, a mock `$httpBackend` can be swapped in to both anticipate request attempts and provide predefined responses.

So let's inject it along with `parkFactory` and set up an expectation:

```javascript
// national-parks/test/parkFactorySpec.js

describe('parkFactory', function () {

  var parkFactory, $httpBackend;

  beforeEach(function () {

    module('nationalParks');

    inject(function (_parkFactory_, _$httpBackend_) {
      parkFactory = _parkFactory_;
      $httpBackend = _$httpBackend_;
    });

  });

  describe('#create', function () {

    it('should POST a new park', function () {

      var newPark = { name: 'Arches', state: 'Utah' };
      var savedPark = { id: 4, name: 'Arches', state: 'Utah' };

      $httpBackend.expectPOST('/api/parks', parkDetails)
        .respond(200, savedPark);

      // do something to satisfy the expectation
      
    });

  });

});
```

Here we are specifying that `$httpBackend` should receive a `POST` request containing a `POST` body "equal" to `newPark`. It will then "respond" with a payload of `savedPark`. Of course our test is already crashing and burning, but **NOT** because `$httpBackend` failed us.

```bash
FAILED TESTS:
  parkFactory
    ✖ "before each" hook
    Error: [$injector:unpr] Unknown provider: parkFactoryProvider <- parkFactory
```

So here is a skeleton `parkFactory`:

```javascript
;(function () {
  'use strict';

  angular
    .module('nationalParks')
    .factory('parkFactory', parkFactory);

  parkFactory.$inject = ['$q', '$http'];

  function parkFactory($q, $http) {

    var factory = {

    };

    return factory;

  }

}());
```

And our test passes? Wut?

```bash
  parkFactory
    #create
      ✔ should POST a new park

Finished in 0.029 secs / 0.014 secs

SUMMARY:
✔ 2 tests completed
```

If you are familiar with Mocha, you may already know that a test that does not result in a thrown exception will *pass*. Throwing is what an assertion library like Chai will do for us, in addition to offering a description of why. `$httpBackend` can throw for us too, but we need to explicitly ask it to.

```javascript
it('should POST a new park', function () {

  var newPark = { name: 'Arches', state: 'Utah' };
  var savedPark = { id: 4, name: 'Arches', state: 'Utah' };

  $httpBackend.expectPOST('/api/parks', newPark)
    .respond(200, savedPark);

  // do something to satisfy the expectPOST

  // throw if no POST received!
  $httpBackend.verifyNoOutstandingExpectation();

});
```

That's more like it.

```bash
FAILED TESTS:
  parkFactory
    #create
      ✖ should POST a new park
      Error: Unsatisfied requests: POST /api/parks
```

Let's finish out the test.

```javascript
it('should POST a new park', function () {

  var newPark = { name: 'Arches', state: 'Utah' };
  var savedPark = { id: 4, name: 'Arches', state: 'Utah' };

  $httpBackend.expectPOST('/api/parks', newPark)
    .respond(200, savedPark);

  // send POST to $httpBackend and wait to capture response
  var createdPark = parkFactory.create(newPark);

  // trigger "response" from $httpBackend
  $httpBackend.flush();

  // check the results
  expect(createdPark).to.eventually.deep.equal(savedPark);

  $httpBackend.verifyNoOutstandingExpectation();

});
```

To summarize, we want to `POST` a payload to our mock web service, and be ready to catch the response in a `createdPark` variable. Then manually return the response with `$httpBackend.flush`. Finally, we verify that the expected value is returned by `parkFactory.create`. A couple of things to note: Our parkFactory will return a promise courtesy of `$q`, so the `eventually` chainable method of Chai-As-Promised is used to resolve the promise. Also Chai's `deep` equal is used to check equality between objects and arrays, as they cannot be directly compared with normal `==` or `===` equality.

```bash
FAILED TESTS:
  parkFactory
    #create
      ✖ should POST a new park
      TypeError: undefined is not a function
```

Great, let's implement `parkFactory.create`!

```javascript
;(function () {
  'use strict';

  angular
    .module('nationalParks')
    .factory('parkFactory', parkFactory);

  parkFactory.$inject = ['$q', '$http'];

  function parkFactory($q, $http) {

    var factory = {
      create: create
    };

    return factory;

    function create(newPark) {
      var url = '/api/parks';
      return $q(function (resolve) {
        return $http.post(url, newPark)
          .success(function (savedPark) {
            resolve(savedPark);
          });
      });
    }

  }

}());
```

Boom!

```bash
Start:
  National Parks
    app title
      ✔ should be "National Parks"
  parkFactory
    #create
      ✔ should POST a new park

Finished in 0.036 secs / 0.021 secs

SUMMARY:
✔ 2 tests completed
```

##### Refactor the Test Suite

We'd like to avoid having to repeat things like calling `$httpBackend.verifyNoOutstandingExpectation` (GUH!) at the end of every test, so we can wrap that in an `afterEach` block. We'll also include `$httpBackend.verifyNoOutstandingRequest` to ensure that we didn't forget to call `$httpBackend.flush` during any tests. It would be nice to just recycle some canned data during tests, so we'll declare and initialize that at the top of the suite.

```javascript
var parkFactory, $httpBackend, newPark, savedPark, parkUpdates, updatedPark, parkList;

beforeEach(function () {
  // initialize our data variables
  newPark = { name: 'Arches', state: 'Utah' };
  savedPark = { id: 4, name: 'Arches', state: 'Utah' };
  parkList = [
    { id: 1, name: 'Glacier' },
    { id: 2, name: 'Crater Lake' }
  ];
  parkUpdates = { id: 3, description: 'Sweet.' };
  updatedPark = { id: 3, name: 'Joshua Tree', description: 'Sweet.' };

  module('nationalParks');

  inject(function (_parkFactory_, _$httpBackend_) {
    parkFactory = _parkFactory_;
    $httpBackend = _$httpBackend_;
  });

});

afterEach(function () {
  // throw errors if $httpBackend is disappointed
  $httpBackend.verifyNoOutstandingExpectation();
  $httpBackend.verifyNoOutstandingRequest();
});
```

##### Code Branches and Stubs

Let's fast-forward a little bit. Our `parkFactory` test suite does not need to evolve much more. Given what we've covered so far to test-drive our `create` method, similar tests and implementations can be written for `getList`, `getOne`, and `update`. You can look at the project source code and tests to get caught up if you get stuck or don't want to try on your own.

We have an opportunity to generalize the API of `parkFactory` a little bit. Rather than forcing a controller to decide whether to call `create` or `update`, we can add a convenience method, `save`. This method should delegate to `update` if the park details it receives contains an `id` property, otherwise delegate to `create`.

```javascript
describe('#save', function () {

  it('should call #update if the details contain an ID');
  it('should call #create if the details do not contain an ID');

});
```

Now, we already know that `create` and `update` already work, so we aren't interested in exercising them. And we don't want to set up `$httpBackend` again just to check which was called by `save`. So we are going to use `sinon`.

`sinon.stub` can be used to wrap a function and record information about whether it was called and with what arguments. A `spy` is also capable of this, but we want to prevent `create` and `update` from in turn hitting `$httpBackend`. We don't want any custom responses from `create` or `update`, but we still want code execution to effectively stop with them.

```javascript
describe('#save', function () {

  beforeEach(function () {
    sinon.stub(parkFactory, 'update');
    sinon.stub(parkFactory, 'create');
  });

  it('should call #update if the details contain an ID', function () {

    parkFactory.save(parkUpdates);

    expect(parkFactory.update).to.have.been.calledWith(parkUpdates);
    expect(parkFactory.create).not.to.have.been.called;

  });

  it('should call #create if the details do NOT contain an ID', function () {

    parkFactory.save(newPark);

    expect(parkFactory.create).to.have.been.calledWith(newPark);
    expect(parkFactory.update).not.to.have.been.called;

  });

});
```

And the passing one-liner:

```javascript
function save(parkDetails) {
  return parkDetails.id ? factory.update(parkDetails) : factory.create(parkDetails);
}
```

### TODO

- Routes
- Controllers
- Filters
- Directives
- Gotchas
- Misc. Tips
- Attribution
- Reading

