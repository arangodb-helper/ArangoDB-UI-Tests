/*global casper */
var phantomcss = require("../../phantomcss");
phantomcss.init();

casper.start("http://localhost:9999/_db/_system/_admin/aardvark/standalone.html#collections");
casper.viewport(1024,768);

casper.then(function() {
  phantomcss.screenshot("nav", "navigationBar");
});

casper.then(function end_it(){
  casper.test.done();
});

casper.run(function() {
  phantomcss.exit(phantomcss.getExitStatus());
});

