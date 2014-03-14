/*global casper, exports */
exports.test = function(casper, phantomcss, baseUrl) {

  casper.thenOpen(baseUrl + "#api");

  casper.then(function waitForLoading() {
    casper.waitUntilVisible("#resources_container");
  });

  casper.then(function showDocument() {
    casper.click("#resource_document h2 a");
    casper.waitUntilVisible('#document_endpoint_list',
      function success() {
        phantomcss.screenshot("#content", "apiContent");
      },
      function timeout() {
        casper.test.fail("Could not dropdown the document API.");
      }
    );
  });
};
