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
      this.click('#info-switch');
      this.waitUntilVisible(
        'li.active #info-switch',
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
      this.click('#error-switch');
      this.waitUntilVisible(
        'li.active #error-switch',
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
      this.click('#warning-switch');
      this.waitUntilVisible(
        'li.active #warning-switch',
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
      this.click('#debug-switch');
      this.waitUntilVisible(
        'li.active #debug-switch',
        function() {},
        function timeout() {
          casper.test.fail('open logs debug view failed');
        }
      );
    }
  );

  screenshot();



};
