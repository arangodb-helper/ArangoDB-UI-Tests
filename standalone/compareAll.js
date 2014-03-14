/*global casper */
var phantomcss = require("../phantomcss");
var baseUrl = "http://localhost:9999/_db/_system/_admin/aardvark/standalone.html";
var Helper = require("../arangoHelper/helper").Helper;
phantomcss.init();

casper.start();
var helper = new Helper(casper, baseUrl);
casper.viewport(1024,768);

require("footerBar/footerBar.js").test(casper, phantomcss, baseUrl);
require("navigationBar/navigationBar.js").test(casper, phantomcss, baseUrl);
require("tabApplications/tabApplications.js").test(casper, phantomcss, baseUrl);
require("tabDashboard/tabDashboard.js").test(casper, phantomcss, baseUrl);
require("tabAQLEditor/tabAQLEditor.js").test(casper, phantomcss, baseUrl);
require("tabShell/tabShell.js").test(casper, phantomcss, baseUrl);
require("tabCollections/tabCollections.js").test(casper, phantomcss, baseUrl);
require("tabCollections/tabCollectionsSorting.js").test(casper, phantomcss, baseUrl, helper);
require("tabCollections/tabCollectionsSearch.js").test(casper, phantomcss, baseUrl, helper);
require("tabDB/tabDB.js").test(casper, phantomcss, baseUrl, helper);

casper.then(function checkImages() {
  phantomcss.compareAll();
});

casper.then(function end_it(){
  casper.test.done();
});

casper.run(function() {
  phantomcss.exit(phantomcss.getExitStatus());
});
