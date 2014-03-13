/*global casper, exports */
exports.test = function(casper, phantomcss, baseUrl) {
  casper.thenOpen(baseUrl + "#collections");

  casper.then(function() {
    phantomcss.screenshot("footer", "footerBar");
  });
};
