/*global casper */
var phantomcss = require("../phantomcss");
var baseUrl = "http://localhost:9999/_db/_system/_admin/aardvark/standalone.html";
phantomcss.init();

casper.start();
casper.viewport(1024,768);

require("footerBar/footerBar.js").test(casper, phantomcss, baseUrl);
require("navigationBar/navigationBar.js").test(casper, phantomcss, baseUrl);
require("tabApplications/tabApplications.js").test(casper, phantomcss, baseUrl);
require("tabDashboard/tabDashboard.js").test(casper, phantomcss, baseUrl);

casper.then(function chexxor() {
  phantomcss.compareAll();
});

casper.then(function end_it(){
  casper.test.done();
});

casper.run(function() {
  phantomcss.exit(phantomcss.getExitStatus());
});
