/*global casper, exports */
exports.test = function(casper, phantomcss, baseUrl) {
  casper.thenOpen(baseUrl + "#query");

  casper.then(function() {
    casper.fillSelectors("#aqlEditor", {
      "textarea.ace_text-input": "for i in 0..5\n  filter i % 2 == 0\nreturn i"
    });
    phantomcss.screenshot("#content", "tabAQLEditorEnteredQuery");
  });

  casper.then(function() {
    casper.click("#submitQueryButton");
    casper.waitUntilVisible("#queryOutput",
      function success() {
        phantomcss.screenshot("#content", "tabAQLEditorResult");
      },
      function timeout() {
        casper.test.fail("Unable to submit AQL query.");
      }
    );
  });

  casper.then(function() {
    casper.click(".ace_fold-widget");
    phantomcss.screenshot("#result", "tabAQLEditorFoldedResult");
  });
};

