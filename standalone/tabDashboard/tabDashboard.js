/*global casper, exports */
exports.test = function(casper, phantomcss, baseUrl) {
  casper.thenOpen(baseUrl + "#dashboard");

  casper.then(function() {
    phantomcss.screenshot("#content", 1, "canvas, .dygraph-axis-label", "tabDashboard");
  });
};
