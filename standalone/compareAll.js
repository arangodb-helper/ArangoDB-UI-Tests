/*global casper */
var phantomcss = require("../../phantomcss");
phantomcss.init();

casper.start();

casper.then(function chexxor() {
  phantomcss.compareAll();
});

casper.then(function end_it(){
  casper.test.done();
});

casper.run(function() {
  phantomcss.exit(phantomcss.getExitStatus());
});
