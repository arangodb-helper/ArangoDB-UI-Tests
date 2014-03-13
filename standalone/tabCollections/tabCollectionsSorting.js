/*global casper, jQuery, exports */
exports.test = function (casper, phantomcss, baseUrl, helper) {

  helper.createCollection('aaa', 'document');
  helper.createCollection('aba', 'document');
  helper.unloadCollection('aba');
  helper.createCollection('abb', 'document');
  helper.createCollection('bba', 'document');
  helper.createCollection('aab', 'edge');
  helper.createCollection('bab', 'edge');
  helper.createCollection('bbb', 'edge');
  helper.createCollection('ccc', 'edge');

  casper.thenOpen(baseUrl + "#collections");

  //fill database
//  helper.createCollection('aaa', 'document');

  //*** helper ***
  //open toggle
  var openToggle = function() {
    this.click('#collectionsToggle');
    this.waitUntilVisible(
      '#collectionsDropdown2',
      function success () {},
      function timeout() {
        casper.test.fail('open toggle failed');
      }
    );
  };

  //open toggle
  var closeToggle = function() {
    this.click('#collectionsToggle');
    this.waitWhileVisible(
      '#collectionsDropdown2',
      function success () {},
      function timeout() {
        casper.test.fail('close toggle failed');
      }
    );
  };

  var screenshot = function() {
    casper.then(
      function() {
        phantomcss.screenshot("#content", 'tab-collections-sorting');
      }
    );
  };

  //*** /helper ***

  //initial collections view
  screenshot();


  //open toggle
  casper.then(
    function() {
      this.click('#collectionsToggle');
      this.waitUntilVisible(
        '#collectionsDropdown2',
        function success () {},
        function timeout() {
          casper.test.fail('open toggle failed');
        }
      );
    }
  );

  screenshot();

  //show system collections
  casper.then(
    function() {
      this.click('#checkSystem');
    }
  );

  screenshot();

  //hide document collections
  casper.then(
    function() {
      this.click('#checkDocument');
    }
  );

  screenshot();
  //hide edge collections
  casper.then(
    function() {
      this.click('#checkEdge');
    }
  );

  screenshot();

  //hide system collections
  casper.then(
    function() {
      this.click('#checkSystem');
    }
  );

  screenshot();

  //show all types
  casper.then(
    function() {
      this.click('#checkSystem');
      this.click('#checkDocument');
      this.click('#checkEdge');
    }
  );

  screenshot();

  //hide loaded
  casper.then(
    function() {
      this.click('#checkLoaded');
    }
  );

  screenshot();

  //hide unloaded
  casper.then(
    function() {
      this.click('#checkUnloaded');
    }
  );

  screenshot();

  //show all types
  casper.then(
    function() {
      this.click('#checkLoaded');
      this.click('#checkUnloaded');
    }
  );

  screenshot();

  //sort descending
  casper.then(
    function() {
      this.click('#sortOrder');
    }
  );

  screenshot();

  //sort by type
  casper.then(
    function() {
      this.click('#sortType');
    }
  );

  screenshot();

  //close toggle
  casper.then(
    function() {
      this.click('#collectionsToggle');
      this.waitWhileVisible(
        '#collectionsDropdown2',
        function success () {},
        function timeout() {
          casper.test.fail('open toggle failed');
        }
      );
    }
  );
  screenshot();
};
