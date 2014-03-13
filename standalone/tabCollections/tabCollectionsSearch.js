/*global casper, exports */
exports.test = function (casper, phantomcss, baseUrl, helper) {
  helper.createCollection('myDocumentCollection1', 'document');
  helper.createCollection('myDocumentCollection2', 'document');
  helper.createCollection('myDocumentCollection3', 'document');
  helper.createCollection('myDocumentCollection4', 'document');
  helper.createCollection('myEdgeCollection1', 'edge');
  helper.createCollection('myEdgeCollection2', 'edge');
  helper.createCollection('myEdgeCollection3', 'edge');
  helper.createCollection('myEdgeCollection4', 'edge');

  casper.thenOpen(baseUrl + "#collections");


  //*** helper ***
  var screenshot = function() {
    casper.then(
      function() {
        phantomcss.screenshot("#content", 'tab-collections-search');
      }
    );
  };

  //*** /helper ***

  //initial collections view
  screenshot();

  //show system collections
  casper.then(
    function() {
      this.click('#collectionsToggle');
      screenshot();
      this.waitUntilVisible(
        '#collectionsDropdown2',
        function success() {
          this.click('#checkSystem');
        },
        function timeout() {
          casper.test.fail('#add-collection modal failed');
        }
      );
    }
  );
  screenshot();

  //fill search field
  casper.then(
    function () {
      casper.sendKeys('#searchInput', 'my');
      screenshot();
    }
  );

  casper.then(
    function () {
      casper.sendKeys('#searchInput', 'd');
      screenshot();
    }
  );

  casper.then(
    function () {
      casper.sendKeys('#searchInput', '', {reset : true});
      screenshot();
    }
  );

  casper.then(
    function () {
      casper.sendKeys('#searchInput', '3');
      screenshot();
    }
  );

  helper.cleanup();
};
