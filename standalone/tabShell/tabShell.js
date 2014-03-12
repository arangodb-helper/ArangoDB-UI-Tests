/*global casper, exports */
exports.test = function(casper, phantomcss, baseUrl) {
  casper.thenOpen(baseUrl + "#shell");

  //TODO Send text to the shell
  casper.then(function() {
    phantomcss.screenshot("#content", "tabJSShell");
  });
};
