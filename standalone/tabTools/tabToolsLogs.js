/*global casper, exports */
exports.test = function (casper, phantomcss, baseUrl, helper) {

  casper.thenOpen(baseUrl + "#logs");

  //*** helper ***
  var screenshot = function(id) {
    casper.then(
      function() {
        phantomcss.screenshot("#content", 0, '.center.seccol', 'tab-tools-logs');
      }
    );
  };
  //*** /helper ***


  casper.then(
    function() {
      this.waitUntilVisible(
        '#logContent',
        function() {},
        function timeout() {
          casper.test.fail('open logs view failed');
        }
      );
    }
  );

  //initial view
  screenshot();

  //info tab
  casper.then(
    function() {
      this.click('#loginfo');
      this.waitForSelector(
        '#loginfo.arangodb-tabbar.arango-active-tab',
        function() {},
        function timeout() {
          casper.test.fail('open logs info view failed');
        }
      );
    }
  );

  screenshot();

  //error tab
  casper.then(
    function() {
      this.click('#logerror');
      this.waitForSelector(
        '#logerror.arangodb-tabbar.arango-active-tab',
        function() {},
        function timeout() {
          casper.test.fail('open logs error view failed');
        }
      );
    }
  );

  screenshot();

  //info tab
  casper.then(
    function() {
      this.click('#logwarning');
      this.waitForSelector(
        '#logwarning.arangodb-tabbar.arango-active-tab',
        function() {},
        function timeout() {
          casper.test.fail('open logs warnings view failed');
        }
      );
    }
  );

  screenshot();

  //info tab
  casper.then(
    function() {
      this.click('#logdebug');
      this.waitForSelector(
        '#logdebug.arangodb-tabbar.arango-active-tab ',
        function() {},
        function timeout() {
          casper.test.fail('open logs debug view failed');
        }
      );
    }
  );

  screenshot();



};
