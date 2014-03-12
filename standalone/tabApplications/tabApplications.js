/*global casper */
var phantomcss = require("../../phantomcss");
phantomcss.init();

var installed = "#content #installedList li.tile:first-of-type";
var available = "#content #availableList li.tile:first-of-type";

casper.start("http://localhost:9999/_db/_system/_admin/aardvark/standalone.html#applications");
casper.viewport(1024,768);

casper.then(function startingPoint() {
  phantomcss.screenshot("#content", "applicationsContent");
  phantomcss.screenshot(installed, "activeApplicationTile");
  phantomcss.screenshot(available, "availableApplicationTile");
});

casper.then(function downloadDropdown() {
  casper.click("#importFoxxToggle");
  casper.waitUntilVisible('#foxxDropdownImport',
    function success() {
      phantomcss.screenshot("#content", 0, "input[type=file], div.contentDiv", "foxxDropdownImport");
    },
    function timeout() {
      casper.test.fail("Could not dropdown dialog to import app");
    }
  );
});

casper.then(function settingsDropdown() {
  casper.click("#foxxToggle");
  casper.waitUntilVisible('#foxxDropdownOut',
    function success() {
      phantomcss.screenshot("#content", 0, "input[type=file], div.contentDiv", "foxxDropdownImport");
    },
    function timeout() {
      casper.test.fail("Could not dropdown dialog to change settings");
    }
  );
});

casper.then(function modifyInstalled() {
  casper.click(installed + " span.icon_arangodb_settings2");
  casper.waitUntilVisible('#change-foxx',
    function success() {
      phantomcss.screenshot("#change-foxx", "modifyApplicationDialog");
    },
    function timeout() {
      casper.test.fail("Could not load dialog to modify an app");
    }
  );
});

casper.then(function fillADifferentMount(){
  casper.fillSelectors("#change-foxx", {
    "input#change-mount-point": "/newPath"
  });
  phantomcss.screenshot("#change-foxx", "modifiedApplicationDialog");
});

casper.then(function closeModifyDialog(){
  casper.click("div.modal-header button.close");
  casper.waitWhileVisible('#change-foxx',
    undefined,
    function timeout() {
      casper.test.fail("Could not close dialog for app modification");
    }
  );
});

casper.then(function installed() {
  casper.click(available + " button.install");
  casper.waitUntilVisible('#install-foxx',
    function success() {
      phantomcss.screenshot("#install-foxx", "installApplicationDialog");
    },
    function timeout() {
      casper.test.fail("Could not load dialog to install an app");
    }
  );
});

casper.then(function closeInstallDialog(){
  casper.click("div.modal-header button.close");
  casper.waitWhileVisible('#install-foxx',
    undefined,
    function timeout() {
      casper.test.fail("Could not close dialog for app installation");
    }
  );
});

casper.then(function end_it(){
  casper.test.done();
});

casper.run(function() {
  phantomcss.exit(phantomcss.getExitStatus());
});

